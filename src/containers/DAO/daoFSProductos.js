const ContainerArchivo = require("../ContainerArchivo.js");

let instance = null;
class productosDaoFS extends ContainerArchivo {
  constructor() {
    super("./DB/productos.json");
  }
  static getInstance() {
    if (!instance) {
      instance = new productosDaoFS();
    }
    return instance;
  }
}

module.exports = productosDaoFS.getInstance();
