const express = require("express");
const path = require("path");
const fs = require("fs");
const users = require("../data/users");
const { announcement, getBySubname, getBySubname2,ann2,announcement2,announce2 } = require("../data/announcementData");
const { isEmpty, empty } = require("../utils/object");
const { checkAuth } = require("../middleware/auth.middleware");

const publicRouter = express.Router();
publicRouter.use(express.static(path.join(__dirname, "../public")));
publicRouter.use(express.json());

publicRouter
  .get("/", (req, res) => {
    
    res.render("TP.hbs", announcement2);
  })
  .get("/info", (req, res) => {
    const { name, someSpec, price, username, telNum } = req.query;

    const tempOBJ = {
      ANNVisible: !isEmpty(req.query),
      annName: name || empty,
      someSpec: someSpec || empty,
      price: price || empty,
      username: username || empty,
      telNum: telNum || empty,
      query: JSON.stringify(req.query, null, "\t"),

      imgFound: false,
    };

    const AnnInfo = getBySubname(name);
    if (!isEmpty(AnnInfo)) {
      tempOBJ.imgFound = true;

      tempOBJ.someSpec = AnnInfo.someSpec;
      tempOBJ.imgLink = AnnInfo.img;
      tempOBJ.price = AnnInfo.price;
      tempOBJ.username = AnnInfo.username;
      tempOBJ.telNum = AnnInfo.telNum;
    }

    res.render("announcement.hbs", tempOBJ);
  })
  .use(express.static(path.join(__dirname, "public")));

publicRouter
  .use("/.search", express.static(path.join(__dirname, "../public/search.html")))
  .use(express.json())
  .get("/search", (req, res) => {
    const { name, price } = req.query;
    const tempOBJ = {
      ANNVisible: !isEmpty(req.query),
      annName: name || empty,
      price: price || empty,
      query: JSON.stringify(req.query, null, "\t"),

      imgFound: false,
    };
   
    const SearchGet = getBySubname(name);
   
    if (!isEmpty(SearchGet)) {
      tempOBJ.imgFound = true;

      
      tempOBJ.price = SearchGet.price;
    }
    
    res.render("TPforSearch.hbs", tempOBJ);
  }).use(express.static(path.join(__dirname, "public")));


publicRouter
  .use("/.reg", express.static(path.join(__dirname, "../public/reg.html")))
  .use(express.json())
  .post("/reg", (req, res) => {
    const { login, username, password, confirm_password } = req.body;

    if (password == confirm_password) {
      const data = { login, username, password };
      const jsonData = JSON.stringify([data], null, 4);
      fs.writeFileSync("./data/userss.json", jsonData, (err) => {
        if (err) throw err;
      });

      res.json({ path: "/.enter" });
    } else {
      return res.status(404).json({ message: "Пароли не совпадают" });
    }
  });

publicRouter
  .use("/.enter", express.static(path.join(__dirname, "../public/auth.html")))
  .use(express.json())
  .post("/login", (req, res) => {
    const { login, password } = req.body;

    if (!users.validateCredentials(login, password))
      return res.status(404).json({ message: "Такого пользователя нет!" });

    req.session.auth = true;
    req.session.login = login;

    res.json({ path: "/" });
  });

module.exports = publicRouter;
