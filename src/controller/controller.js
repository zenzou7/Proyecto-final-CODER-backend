const config = require("../../config/config.js");
const { getAllProds } = require("../service/serviceProductos.js");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs.default({ PORT: config.PORT }).argv;
const winston = require("winston");

const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "warn.log", level: "warn" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const apiJson = async (req, res) => {
  const data = await getAllProds();
  res.json(data);
};

const getRoot = async (req, res) => {
  logger.log("info", "Get / - log info");
  try {
    const prods = await getAllProds();

    res.render("pages/form", { products: prods });
  } catch (err) {
    logger.log("error", `Error in Get /: ${err}- log error`);
  }
};

const getInfo = (req, res) => {
  logger.log("info", "get en /info - log info");

  res.json({
    Argumentos: args,
    Path: process.execPath,
    OS: process.plataform,
    ProcessId: process.pid,
    NodeVersion: process.version,
    MemoriaTotalReservada: process.memoryUsage.rss(),
    CarpetaDelProyecto: process.cwd(),
  });
};

module.exports = {
  apiJson,
  getRoot,
  getInfo,
};
