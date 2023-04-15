const {
  savePedido,
  deletePedido,
  allPedidos,
} = require("../service/servicePedidos.js");
const winston = require("winston");

const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "warn.log", level: "warn" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const getAllPedidos = async (req, res) => {
  logger.log("info", "Get en /api/pedidos - log info");
  try {
    const dataPedidos = await allPedidos(req.user.email);
    res.json(dataPedidos);
  } catch (err) {
    console.log(err);
  }
};

const postPedidos = async (req, res) => {
  logger.log("info", "Post en /api/pedidos - log info");
  try {
    const body = req.body;

    const user = {
      username: req.user.username,
      number: req.user.number,
      avatar: req.user.avatar,
      email: req.user.email,
    };

    savePedido(body, user);
    res.json("Pedido hecho con exito!");
  } catch (err) {
    logger.log("error", `Error in Post /api/pedidos: ${err}- log error`);
  }
};

const deletePedidoController = async (req, res) => {
  logger.log("info", "Delete en /api/pedidos - log info");
  try {
    const id = req.params.id;
    deletePedido(id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postPedidos, deletePedidoController, getAllPedidos };
