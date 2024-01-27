const mongoose = require("mongoose");
const Album = require("./Album");

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const User = new mongoose.Schema({
  nombre: {
    type: String,
    required: "El nombre es requerido",
  },
  apellido: { type: String, required: "El apellido es requerido" },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return regex.test(v);
      },
      message: "You must enter a valid email!",
    },
  },
  password: { type: String },
  albums: [
    {
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
    },
  ],
});

module.exports = mongoose.model("User", User);
