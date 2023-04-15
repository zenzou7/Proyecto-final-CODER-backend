const { Router } = require("express");
const controller = require("../controller/controllerPedidos.js");

const routerPedidos = new Router();

routerPedidos.get("/", controller.getAllPedidos);
routerPedidos.post("/", controller.postPedidos);
routerPedidos.delete("/:id", controller.deletePedidoController);

module.exports = routerPedidos;
