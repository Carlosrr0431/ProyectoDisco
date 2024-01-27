const express = require("express");
const router = express.Router();
const Album = require("../models/Album");
const User = require("../models/User");



//Ruta para crear un nuevo album

router.post("/albums/user/:id", async (req, res) => {
    try {
      // const album = await Album.create(req.body);

      const user = await User.findById(req.params.id);


      user.albums.push(req.body)

      user.save()
  
      if (req.body) {
        res.status(200).send("Se creo el album: " + req.body);
      } else {
        res.status(404).send("No se pudo crear el album");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Ruta para obtener los albums
  
  router.get("/album/user/:user/:titulo", async (req, res) => {
    try {

      const user = await User.findById(req.params.user);
 
  
      if (user.albums) {
        res.status(200).send(user.albums);
      } else {
        res.status(201).send("No se pudieron obtener los albums");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Ruta para traer un album en especifico
  
  router.get("/album/:id", async (req, res) => {
    try {
      const albums = await Album.findById(req.params.id);
  
      if (albums) {
        res.status(200).send(albums);
      } else {
        res.status(201).send("No se pudieron obtener los albums");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  //Ruta para traer los albums de un usuario especifico

  router.get("/album/user/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);


      if (user) {
        res.status(200).send(user.albums);
      } else {
        res.status(201).send("No se pudieron obtener los albums");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
  //Ruta para eliminar un album
  
  router.delete('/album/user/:idAlbum/:idUsuario', async ( req, res ) => {
  
    try {
      // const album = await Album.findByIdAndDelete(req.params.id)
      const user = await User.findById(req.params.idUsuario);


      user.albums = user.albums.filter((e) => e.titulo !== req.params.idAlbum)

      user.save()

      
      if ( user.albums ) {
        res.status(200).send("El album se elimino correctamente")
      } else {
        res.status(201).send("No se pudo eliminar el album")
      }
    } catch (error) {
      res.status(500).send(error);
    }
  
  
  })
  
  //Ruta para editar un album
  
  router.put("/album/user/:idUser/:titulo", async (req, res) => {
    try {

      const user = await User.findById(req.params.idUser);

      user.albums[0] = req.body

      user.save()
  
      if (user.albums[0]) {
        res.status(201).send("Se actualizo el album correctamente");
      } else {
        res.status(404).send("No se pudo actualizar el album");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Ruta para agregar canciones
  
  router.post("/canciones/user/:idUser/:titulo", async (req, res) => {
    try {
      const user = await User.findById(req.params.idUser);
  
      user.albums[0].canciones = [...user.albums[0].canciones, req.body]
  
      user.save()
  
      if (user.albums[0]) {
        res
          .status(200)
          .send("Las canciones se actualizaron correctamente" + user.albums[0].canciones);
      } else {
        res.status(404).send("No se pudo actualizar las canciones");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Ruta para quitar una cancion del album
  
  router.put("/canciones/quitar/:id", async (req, res) => {
    try {
      const album = await Album.findById(req.params.id)
  
      album.canciones = album.canciones.filter((e) => e.titulo != req.body.titulo)
  
      album.save()
  
      if (album) {
        res
          .status(200)
          .send("La cancion se elimino correctamente" + album);
      } else {
        res.status(404).send("No se pudo actualizar las canciones");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
  
  //Ruta para traer solo las canciones de cada album
  
  router.get("/canciones/:id", async (req, res) => {
    try {
      const canciones = await Album.findById(req.params.id, {
        canciones: 1,
        _id: 0,
      });
  
      res.status(200).send(canciones);
    } catch (error) {
      res.status(500).send(error);
    }
  });



module.exports = router