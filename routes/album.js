const express = require("express");
const router = express.Router();
const Album = require("../models/Album");



//Ruta para crear un nuevo album

router.post("http://localhost:3000/album", async (req, res) => {
    try {
      const album = await Album.create(req.body);
  
      if (album) {
        res.status(200).send("Se creo el album: " + album);
      } else {
        res.status(404).send("No se pudo crear el album");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Ruta para obtener los albums
  
  router.get("http://localhost:3000/album", async (req, res) => {
    try {
      const albums = await Album.find();
  
      if (albums) {
        res.status(200).send(albums);
      } else {
        res.status(201).send("No se pudieron obtener los albums");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Ruta para traer un album en especifico
  
  router.get("http://localhost:3000/album/:id", async (req, res) => {
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
  
  //Ruta para eliminar un album
  
  router.delete('http://localhost:3000/album/:id', async ( req, res ) => {
  
    try {
      const album = await Album.findByIdAndDelete(req.params.id)
  
      if ( album ) {
        res.status(200).send("El album se elimino correctamente")
      } else {
        res.status(201).send("No se pudo eliminar el album")
      }
    } catch (error) {
      res.status(500).send(error);
    }
  
  
  })
  
  //Ruta para editar un album
  
  router.put("http://localhost:3000/album/:id", async (req, res) => {
    try {
      const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (album) {
        res.status(201).send("Se actualizo el album correctamente");
      } else {
        res.status(404).send("No se pudo actualizar el album");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Ruta para agregar canciones
  
  router.post("http://localhost:3000/canciones/:id?", async (req, res) => {
    try {
      const album = await Album.findById(req.params.id)
  
      album.canciones = [...album.canciones, req.body]
  
      album.save()
  
      if (album) {
        res
          .status(200)
          .send("Las canciones se actualizaron correctamente" + album);
      } else {
        res.status(404).send("No se pudo actualizar las canciones");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Ruta para quitar una cancion del album
  
  router.put("http://localhost:3000/canciones/quitar/:id", async (req, res) => {
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
  
  router.get("http://localhost:3000/canciones/:id", async (req, res) => {
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