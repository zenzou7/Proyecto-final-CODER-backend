const yargs = require("yargs/yargs")(process.argv.slice(2));
const config = require("../../config/config.js");
const args = yargs.default({ PORT: config.PORT }).argv;
const config = require("../../config/config.js");
const DAO = config.DB;
const winston = require("winston");

const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "warn.log", level: "warn" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const routerPostLogin = (req, res) => {
  logger.log("info", "Post en /api/usuarios/login - log info");
  try {
    const { username, password, number, avatar, email } = req.user;
    const user = {
      username: username,
      password: password,
      number: number,
      avatar: avatar,
      email: email,
    };
    res.render("pages/profile", { user });
  } catch (err) {
    logger.log("error", `Error in Post /api/usuarios/login: ${err}- log error`);
  }
};

const routerGetLogin = async (req, res) => {
  logger.log("info", "Get en /api/usuarios/login - log info");
  if (req.isAuthenticated()) {
    const { username, password, number, avatar, email } = req.user;
    const user = { username, password, number, avatar, email };
    res.render("pages/profile", { user });
  } else {
    res.render("pages/login");
  }
};

const routerGetLogout = async (req, res) => {
  try {
    logger.log("info", "Get en /api/usuarios/logout - log info");

    req.session.destroy((err) => {
      if (err) {
        res.send("no pudo deslogear");
      } else {
        res.render("pages/logout");
      }
    });
  } catch (err) {
    logger.log("error", `Error in Get /api/usuarios/logout: ${err}- log error`);
  }
};

const routerGetSignup = (req, res) => {
  logger.log("info", "Get en /api/usuarios/signup - log info");

  if (req.isAuthenticated()) {
    const { username, password, number, avatar, email } = req.user;
    const user = { username, password, number, avatar, email };
    res.render("pages/profile", { user });
  } else {
    res.render("pages/signup");
  }
};

const routerPostSignup = async (req, res) => {
  logger.log("info", "Post en /api/usuarios/signup - log info");

  const { username, password, number, avatar, email } = req.body;
  const user = { username, password, number, avatar, email };
  await DAO.save(user);
  res.render("pages/profile", { user });
};

const routerGetFailLogin = (req, res) => {
  logger.log("info", "Get en /api/usuarios/fail/login - log info");

  res.render("pages/faillogin", { Port: args.PORT });
};

const routerGetFailSignup = (req, res) => {
  logger.log("info", "Get en /api/usuarios/fail/signup - log info");

  res.render("pages/failsignup", { Port: args.PORT });
};

const getInexistent = (req, res) => {
  logger.log("warn", "Get en Inexistent- log warn");
  res.render("pages/inexistent", { Port: args.PORT });
};

module.exports = {
  routerGetFailLogin,
  routerGetFailSignup,
  routerGetLogin,
  routerGetLogout,
  routerGetSignup,
  routerPostLogin,
  routerPostSignup,
  getInexistent,
};
