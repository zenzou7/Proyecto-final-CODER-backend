const { Router } = require("express");
const controller = require("../controller/controllerPedidos.js");

const routerPedidos = new Router();

routerPedidos.post("/", controller.postPedidos);

module.exports = routerPedidos;
