const winston = require("winston");
const {
  getAllProds,
  saveProd,
  deleteProd,
} = require("../service/serviceProductos.js");

const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "warn.log", level: "warn" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const getProds = async (req, res) => {
  logger.log("info", "Get /api/productos - log info");
  try {
    if (req.isAuthenticated()) {
      res.render("pages/productos");
    } else {
      res.render("pages/login");
    }
  } catch (err) {
    logger.log("error", `Error in Get /: ${err}- log error`);
  }
};

const routerDelete = async (req, res) => {
  logger.log("info", "Delete en /api/productos - log info");
  try {
    const id = req.params.id;
    await deleteProd(id);
    res.json({ success: true, msg: "Producto borrado" });
  } catch (err) {
    logger.log("error", `Error in Delete /api/productos: ${err}- log error`);
  }
};

const routerPostForm = (req, res) => {
  logger.log("info", "Post en /api/productos/form - log info");
  try {
    const body = req.body;
    if (body) {
      saveProd(body);

      res.redirect("/");
    } else {
      res.json({ error: true, msg: "Producto no agregado" });
    }
  } catch (err) {
    logger.log("error", `Error in Post /api/productos/form: ${err}- log error`);
  }
};

const routerGetForm = async (req, res) => {
  logger.log("info", "Get en /api/productos/form: - log info");
  try {
    const prods = await getAllProds();

    res.render("pages/form", { products: prods });
  } catch (err) {
    logger.log("error", `Error in Get /api/productos/form: ${err}- log error`);
  }
};

module.exports = {
  getProds,
  routerDelete,
  routerPostForm,
  routerGetForm,
};
