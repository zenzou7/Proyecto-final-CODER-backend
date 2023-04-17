const { normalize, schema } = require("normalizr");
const config = require("../config/config.js");
const DAO = config.DB;

const normalizeChat = async () => {
  try {
    const allData = await DAO.mensajes.getAll();

    const mensajeSchema = new schema.Entity("mensaje");
    const authorSchema = new schema.Entity(
      "author",
      {
        mensaje: mensajeSchema,
      },
      { idAttribute: "email" }
    );
    const chatSchema = new schema.Entity("chat", {
      author: [authorSchema],
    });
    const normalizado = normalize(
      { id: "chatHistory", messages: allData },
      chatSchema
    );

    return normalizado;
  } catch {
    errorLogger.log("error", {
      mensaje: "Error in normalizr.js",
    });
  }
};

module.exports = normalizeChat;
