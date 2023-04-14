const config = require("../../config/config.js");
const DAO = config.DB;
const { sendCartMail } = require("../../utils/nodemailer.js");
const { sendPhoneMsg, sendWhatsAppMsg } = require("../../utils/twilio.js");

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

module.exports = { savePedido };
