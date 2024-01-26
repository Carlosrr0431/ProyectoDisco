const express = require("express");
const routerAlbum = require("./routes/album");
const routerUser = require('./routes/user');
const path = require('path')
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()

const app = express();

app.use(cookieParser())
const url =
  `mongodb+srv://carlosfacundorr:${process.env.PASSWORD_BD}@cluster0.sn0xhln.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json());

app.use("/", routerAlbum);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routerUser);


app.use(cors());



const User = require("./models/User");
const Album = require("./models/Album")

const conectToMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(process.env.PORT, () => {
      console.log(
        "El servidor se conecto en el puerto 3000 exitosamente y la base de datos"
      );
    });
  } catch (error) {
    console.log(error);
  }
};

conectToMongo();
