const config = require("../../config/config.js");
const DAO = config.DB;
const { sendCartMail } = require("../../utils/nodemailer.js");
const { sendPhoneMsg, sendWhatsAppMsg } = require("../../utils/twilio.js");

const allPedidos = async (email) => {
  const dataPedidos = await DAO.pedidos.getAll();
  const pedidosFilter = dataPedidos.filter((pedidos) => pedidos.email == email);
  return pedidosFilter;
};

const savePedido = async (body, user) => {
  const pedido = {
    username: user.username,
    email: user.email,
    number: user.number,
    avatar: user.avatar,
    pedido: body,
  };
  await sendWhatsAppMsg(JSON.stringify(pedido));
  await sendCartMail(pedido.username, pedido.pedido);
  await sendPhoneMsg(pedido.number);
  await DAO.pedidos.save(pedido);
};

const deletePedido = async (id) => {
  if (id) {
    await DAO.pedidos.delete(id);
    return console.log(`Producto ${id} borrado`);
  } else {
    return console.log("No se encontro el pedido");
  }
};

module.exports = { savePedido, deletePedido, allPedidos };
