const express = require("express");
const path = require("path");
const fs = require("fs");
const users = require("../data/users");
const { ann2,ann,announcement, getBySubname, deleteAnnouncement, editAnnouncement } = require("../data/announcementData");
const { checkAuth } = require("../middleware/auth.middleware");
const { isEmpty, empty } = require("../utils/object");

const privateRouter = express.Router();

privateRouter.use(checkAuth);

privateRouter.use(express.static(path.join(__dirname, "../private")));
privateRouter.use(express.json());

privateRouter.get("/username", (req, res) =>
  res.json({
    username: req.session.username || "Пользователь не представлялся",
  })
);

privateRouter
  .use(
    "/addAnn",
    express.static(path.join(__dirname, "../private/Adding.html"))
  )
  .use(express.json())
  .post("/addAnnoncement", (req, res) => {
    const { img, annName, someSpec, price, username, telNum } = req.body;
    const liked = 0;
    const dataFromUser = {
      img,
      annName,
      someSpec,
      price,
      username,
      telNum,
      liked,
    }; 
  
    const dataFromUser2 = {
      
      annName, 
      img,
      price,
      
    };
    const jsonData = JSON.stringify({announce:[dataFromUser2]}, null, 4);
    
    fs.writeFileSync("./data/announcements2.json", jsonData, (err) => {
      if (err) throw err;
    });
    const jsonData2= JSON.stringify({announces:[dataFromUser]}, null,4)
      fs.writeFileSync("./data/announcements.json", jsonData2, (err) => {
       if (err) throw err;
     });
    res.json({ path: "/" });
  });

privateRouter
  .get("/profile", (req, res) => {
    
    res.render("profile.hbs", ann2);
  })
  .use(express.static(path.join(__dirname, "private")));

privateRouter.get("/infoProf", (req, res) => {
  
  
  res.render("announcementForProf.hbs", ann);
})
.use(express.static(path.join(__dirname, "private")));

privateRouter
  .use(
    "/.edit",
    express.static(path.join(__dirname, "../private/Editing.html"))
  )
  .put("/edit", (req, res) => {
    const dataFromUser = req.body;
    const announcementInf = editAnnouncement(dataFromUser);
    const jsonDATA = JSON.stringify({announces:[announcementInf]}, null, 4);
    fs.writeFileSync("./data/announcements2.json", jsonDATA, (err) => {
      if (err) throw err;
    });

    res.json({ path: "/auth/profile" });
  });

privateRouter.delete("/delete", (req, res) => {
  const { name } = req.query;
  const announcementInf = deleteAnnouncement(name);

  const jsonDATA = JSON.stringify([announcementInf], null, 4);
  fs.writeFileSync("./data/announcements2.json", jsonDATA, (err) => {
    if (err) throw err;
  });
  res.json({ path: "/auth/profile" });
});

privateRouter.get("/logout", (req, res) => {
  req.session.auth = false;
  req.session.destroy((err) => {
    if (err) {
      console.error("Ошибка разрушения сессии:", err);
      return res.status(500).send("Ошибка сервера");
    }

    res.redirect("/");
  });
});


// privateRouter.post("/liking", (req, res) => {
//   const { name, count } = req.query;
//   const data = { name, count };
//   if (count > 0) {
//     const DataFromUs = editAnnouncement(data)
    
//   }
// });
// privateRouter
//   .get("/profileLiked", (req, res) => {
//     // в доработке
//     const { username } = req.query;
//     // const {username} = req.session.username;
//     // const AnnInfProf = announcement.getBySubname(username)
//     // res.render("profileLiked.hbs", AnnInfProf);
//   })
//   .use(express.static(path.join(__dirname, "private")));
//// Фуннкция добавления в избранное - доработается в ближайшем времени!

module.exports = privateRouter;
