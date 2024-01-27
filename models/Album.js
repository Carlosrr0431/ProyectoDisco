const mongoose = require("mongoose");

const Album = new mongoose.Schema({
  titulo: { type: String, required: [true, "Ingrese el titulo"] },
  descripcion: {
    type: String,
    required: [true, "Ingrese la descripción"],
    min: 5,
    max: 200,
  },
  fechaVenta: {
    type: Date,
    required: [true, "Ingrese la fecha"],
    min: ["1/1/2000", "Ingrese una fecha valida"],
  },
  canciones: [
    {
      titulo: { type: String },
      duracion: { type: Number },
      url: { type: String },
    },
  ],
  portada: { type: String },
  url: { type: String },
});

module.exports = mongoose.model("Album", Album);
