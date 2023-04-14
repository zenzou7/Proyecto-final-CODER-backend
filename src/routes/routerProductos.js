const { Router } = require("express");
const controller = require("../controller/controllerProductos.js");
const multer = require("multer");
const authPassport = require("../../middlewares/authPassport.js");
const upload = multer();

authPassport();

const routerProductos = new Router();

routerProductos.get("/", controller.getProds);

routerProductos.delete("/:id", controller.routerDelete);

routerProductos.post("/form", upload.none(), controller.routerPostForm);

routerProductos.get("/form", controller.routerGetForm);

module.exports = routerProductos;
