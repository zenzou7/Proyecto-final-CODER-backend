const config = require("../../config/config.js");
const DAO = config.DB;

const getAllProds = async () => {
  const data = await DAO.productos.getAll();
  return data;
};

const getById = async () => {
  const prod = await DAO.productos.getById();
  return prod;
};

const saveProd = async (obj) => {
  await DAO.productos.save(obj);
  return console.log(`Producto ${obj} guardado`);
};

const updateProd = async (id, obj) => {
  await DAO.productos.update(id, obj);
  return console.log(`Producto ${obj} updateado`);
};

const deleteProd = async (id) => {
  if (id) {
    await DAO.productos.delete(id);
    return console.log(`Producto ${idObject} borrado`);
  } else {
    await DAO.productos.delete(id);
    return console.log("Todos los productos borrados");
  }
};

module.exports = {
  getAllProds,
  getById,
  saveProd,
  updateProd,
  deleteProd,
};
