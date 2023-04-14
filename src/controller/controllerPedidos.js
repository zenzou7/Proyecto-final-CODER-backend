const { savePedido } = require("../service/servicePedidos.js");
const winston = require("winston");

const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "warn.log", level: "warn" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

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

module.exports = { postPedidos };
