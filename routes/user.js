const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser')
// const app = express();
// app.use(cookieParser())

const saltRound = 10;

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRound);

  return hash;
};

const check = async (userPassword, dbPassword) => {
  const match = await bcrypt.compare(userPassword, dbPassword);

  return match;
};

//Ruta para crear un usuario
router.post("/usuarios", async (req, res) => {
  try {
    const contraseña = hashPassword(req.body.contraseña);
    const usuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: (await contraseña).toString(),
    };

    const user = await User.create(usuario);

    res.status(200).send("El usuario se creo satisfactoriamente: " + user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Ruta para traer todos los usuarios sin mostrar la contraseña

router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.find();

    if (usuarios) {
      res.status(201).send(usuarios);
    } else {
      res.status(404).send("No se pudo obtener a los usuarios");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Ruta para validar un usuario con login

router.post("/login", async (req, res) => {
  try {
    const usuario = await User.find({ email: req.body.email });

    const match = await check(req.body.password, usuario[0].password);

    const payLoad = {
      nombre: usuario[0].nombre,
      apellido: usuario[0].apellido,
      password: usuario[0].password,
      email: req.body.email,
      _id: usuario[0]._id,
    };

    if (match) {
      const token = jwt.sign(payLoad, "secreto", { expiresIn: "1h" });

      res.cookie("jwt", token);
      res.status(200).send(payLoad);
    } else res.status(200).send("Contraseña Incorrecta");
  } catch (error) {
    res.status(500).send(error);
  }
});

//Ruta para editar los datos del usuario

router.put("/usuarios/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (user) {
      res.status(201).send("Se actualizo satisfactoriamente");
    } else {
      res.status(202).send("No se logro actualizar el elemento");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Ruta para desloguear un usuario

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("jwt");

    res.status(204).send("No Content");
  } catch (error) {
    res.status(504).send(error);
  }
});

//Ruta para validar usuario

router.get("/me", async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const payLoad = jwt.verify(token, "secreto");
   
    res.send(payLoad)
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;
