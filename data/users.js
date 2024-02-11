const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const readUsers = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")));

const readUs = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "userss.json")));


const rewriteUsers = () =>
  fs.writeFileSync(
    path.join(__dirname, "users.json"),
    JSON.stringify(users, null, 4)
  );
const users = readUsers();
const us = readUs();
const getUsers = () => users;
const getUs = () => us;
const userExists = (login) => users.some((login) => user.login === login);

function getBySubname(subname) {
  if (!subname) return {};

  const keys = Object.keys(users);
  const keey = Object.keys(us);
  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return users[key];
    }
  }
  for (const key of keey) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return us[key];
    }
  }
  return {};
}
const validateCredentials = (login, password) => {
  const user = users.find((user) => user.login === login);
  const use = us.find((use) => use.login == login);
  return (
    (user && user.password === password) || (use && use.password === password)
  );
};

module.exports = { users, rewriteUsers, validateCredentials, getBySubname };
