import { onLoad, redirect } from "./utils/utils";

const buttonEdit = document.getElementById("buttonEdit");
const buttonAddSong = document.getElementById("buttonAddSong")
const albumId = window.location.search.substring(7);
let form = document.getElementById("form")
let titulo = document.getElementById('titulo')
let fechaVenta = document.getElementById('fechaVenta')
let descripcion = document.getElementById('descripcion')
let url = document.getElementById('url')



function editEvent() {
    
  redirect(`./editAlbum.html?album=${albumId}`)
}

const addSongEvent = () => {
    redirect(`./addSong.html?album=${albumId}`)
}




const cancelEvent = () => {
  window.location.href=`./album.html?album=${albumId}`
}

form.addEventListener("submit", e => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )

    titulo.value = ""
    fechaVenta = ""
    descripcion = ""
    url.value = ""

    editAlbum(data)
})


const editAlbum = async (data) => {

  try {
    const album = await axios.put(`http://localhost:3000/album/${albumId}`, data )


    if ( album ) {
       swal({
        title: 'Album edited!',
        text: 'You modified the album!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }) 

      window.location.href=`./album.html?album=${albumId}`
    } else {
      console.log("No se pudo actualizar el album");
    }
  } catch (error) {
    swal({
      title: 'Album no editado!',
      text: 'No se pudo actualizar el album',
      icon: 'error',
      confirmButtonText: 'Ok'
    }) 
  }
}
onLoad()

cargaNormal()

42.500
255.000

73.666

