const twilio = require("twilio");

const accountSid = "AC424e813171fd51cafb741a5dbc8a5344";
const authToken = "313c6553221a1408ecfc13ad0b6ac696";

const client = twilio(accountSid, authToken);

const sendPhoneMsg = async (num) => {
  try {
    const message = await client.messages.create({
      body: "Su pedido se ha recibido y se encuentra en proceso",
      from: "+15076827359",
      to: `${num}`,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

const sendWhatsAppMsg = async (body) => {
  try {
    await client.messages.create({
      body: body,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491124559072",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendPhoneMsg, sendWhatsAppMsg };
