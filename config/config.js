if (process.env.MODE != "production") {
  require("dotenv").config();
}
let DAO;

switch (process.env.DB) {
  case "MONGO":
    const daoMongoProductos = require("../src/containers/DAO/daoMongoProductos.js");
    const daoMongoMensajes = require("../src/containers/DAO/daoMongoMensajes.js");
    const daoMongoPedidos = require("../src/containers/DAO/daoMongoPedidos.js");

    const DAOMongo = {
      productos: daoMongoProductos,
      mensajes: daoMongoMensajes,
      pedidos: daoMongoPedidos,
    };
    DAO = DAOMongo;
    break;

  case "ARCHIVO":
    const daoFSProductos = require("../src/containers/DAO/daoFSProductos.js");
    const daoFSMensajes = require("../src/containers/DAO/daoFSMensajes.js");
    const daoFSPedidos = require("../src/containers/DAO/daoFSPedidos.js");

    const DAOFS = {
      productos: daoFSProductos,
      mensajes: daoFSMensajes,
      pedidos: daoFSPedidos,
    };
    DAO = DAOFS;
    break;
}
module.exports = {
  SECRET: process.env.SECRET,
  HOST: process.env.HOST,
  MONGOURL: process.env.MONGOURL,
  MONGOURLSESSION: process.env.MONGOURLSESSION,
  PORT: process.env.PORT,
  DB: DAO,
};
