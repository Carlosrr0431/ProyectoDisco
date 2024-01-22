const mongoose = require("mongoose");

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const User = new mongoose.Schema({
  nombre: {
    type: String,
    required: 'El nombre es requerido'
  },
  apellido: { type: String , required: 'El apellido es requerido'},
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
  // favoritos: [{ type: String }],
});

module.exports = mongoose.model("User", User);
