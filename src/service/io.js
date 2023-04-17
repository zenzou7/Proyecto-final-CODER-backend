const config = require("../../config/config.js");
const DAO = config.DB;
const normalizeChat = require("../../utils/normalizrChat.js");

async function websocket(io) {
  io.on("connection", async (socket) => {
    const chatHistorial = await normalizeChat();
    socket.emit("msg-list", { normalizado: chatHistorial });

    socket.on("msg", async (data) => {
      let fecha = new Date();

      const msg = {
        author: {
          email: data.email,
          nombre: data.nombre,
          apellido: data.apellido,
          avatar: data.avatar,
        },
        text: {
          mensaje: data.mensaje,
          fecha:
            fecha.getDate() +
            "/" +
            (fecha.getMonth() + 1) +
            "/" +
            fecha.getFullYear(),
          hora:
            fecha.getHours() +
            ":" +
            fecha.getMinutes() +
            ":" +
            fecha.getSeconds(),
        },
      };

      DAO.mensajes.save(msg);

      const normalizado = await normalizeChat(data);

      io.sockets.emit("msg-list", { normalizado: normalizado });
    });

    socket.on("sendTable", async (data) => {
      DAO.productos.save(data);

      try {
        const productos = await DAO.productos.getAll();
        socket.emit("prods", productos);
      } catch (err) {
        logger.log("error", `${err} - log error`);
      }
    });
  });
}

module.exports = websocket;
