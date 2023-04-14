const { Router } = require("express");
const controller = require("../controller/controllerUsuarios.js");
const passport = require("passport");
const multer = require("multer");
const authPassport = require("../../middlewares/authPassport.js");
const upload = multer();

authPassport();

const routerUsuarios = new Router();

routerUsuarios.post(
  "/login",
  upload.none(),
  passport.authenticate("login", {
    failureRedirect: "/api/usuarios/fail/login",
  }),
  controller.routerPostLogin
);

routerUsuarios.get("/login", controller.routerGetLogin);

routerUsuarios.get("/logout", controller.routerGetLogout);

routerUsuarios.get("/signup", controller.routerGetSignup);

routerUsuarios.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/api/usuarios/fail/signup",
  }),
  controller.routerPostSignup
);

routerUsuarios.get("/fail/login", controller.routerGetFailLogin);

routerUsuarios.get("/fail/signup", controller.routerGetFailSignup);

module.exports = routerUsuarios;
