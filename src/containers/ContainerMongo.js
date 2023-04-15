const mongoose = require("mongoose");

class ContenedorMongo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    const prods = await this.ruta.find();

    return prods;
  }
  async getById(prodId) {
    const prod = await this.ruta.find({}).sort({ id: prodId }).limit(1);
    return prod;
  }
  async save(obj) {
    const newProd = new this.ruta(obj);
    newProd.save(function (err) {
      if (err) return console.log(err);
    });

    return console.log("Guardado con exito");
  }
  async update(id, obj) {
    const objId = { id: id };
    const update = {
      $set: obj,
    };
    const options = { upsert: false };

    await this.ruta
      .updateOne(objId, update, options)
      .then((result) => {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount && modifiedCount) {
          console.log(`Se actualizó correctamente.`);
        }
      })
      .catch((err) => console.error(`No se pudo actualizar: ${err}`));
  }
  async delete(id) {
    if (id) {
      const idObject = mongoose.Types.ObjectId(id);
      await this.ruta.deleteOne({ _id: idObject });
      return console.log(`Producto ${idObject} borrado`);
    } else {
      const deleteAll = await this.ruta.deleteMany({});
      return console.log("Todos los productos borrados");
    }
  }
}

module.exports = ContenedorMongo;
