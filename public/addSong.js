import { onLoad } from "./utils/utils.js"

const editAlbum = document.getElementById('editAlbum')
const addSong = document.getElementById('addSong')
const titulo = document.getElementById('titulo')
const duracion = document.getElementById('duracion')
const url = document.getElementById('url')
const albumId = window.location.search.substring(7);
let avatarNombre = document.getElementById('avatarNombre')
let avatarEmail = document.getElementById('avatarEmail')
const botonBack = document.getElementById("botonBack")
const botonCancel = document.getElementById("botonCancel")

const caracter = /%20/g;
const cadena = albumId.replace(caracter, ' ')

editAlbum.addEventListener('click', () => {
  editAlbum.setAttribute('href', `/editAlbum.html?album=${cadena}`)
})

addSong.addEventListener('click', () => {
  addSong.setAttribute('href', `/addSong.html?album=${cadena}` )
})

botonBack.addEventListener('click', () => {
  window.location.href = `./album.html?album=${cadena}`
})

botonCancel.addEventListener('click', () => {
  window.location.href = `./album.html?album=${cadena}`
})


const cancelEvent = () => {
  window.location.href=`./album.html?album=${cadena}`
}

form.addEventListener("submit", e => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )

    titulo.value = ""
    duracion.value = ""
    url.value = ""

    agregarCancion(data)
})


const agregarCancion = async (data) => {


  try {

    const userId = localStorage.getItem("idUsuario")

    const album = await axios.post(`/canciones/user/${userId}/${cadena}`, data )

    if ( album ) {
       swal({
        title: 'Canción agregada!',
        text: 'Pudiste agregar la canción!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }) 

      // window.location.href=`./album.html?album=${cadena}`
    } else {
      console.log("No se puso agregar la canción");
    }
  } catch (error) {
    swal({
      title: 'Canción no agregada!',
      text: 'No se pudo agregar la canción',
      icon: 'error',
      confirmButtonText: 'Ok'
    }) 
  }
}

onLoad()