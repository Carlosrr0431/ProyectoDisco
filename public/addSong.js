import { onLoad } from "./utils/utils.js"

const editAlbum = document.getElementById('editAlbum')
const addSong = document.getElementById('addSong')
const titulo = document.getElementById('titulo')
const duracion = document.getElementById('duracion')
const url = document.getElementById('url')
const albumId = window.location.search.substring(7);

editAlbum.addEventListener('click', () => {
  editAlbum.setAttribute('href', `/editAlbum.html?album=${window.location.search.substring(7)}`)
})

addSong.addEventListener('click', () => {
  addSong.setAttribute('href', `/addSong.html?album=${window.location.search.substring(7)}` )
})



const cancelEvent = () => {
  window.location.href=`./album.html?album=${albumId}`
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

  console.log(albumId);
  try {
    const album = await axios.post(`http://localhost:3000/canciones/${albumId}`, data )

    console.log(data);

    if ( album ) {
       swal({
        title: 'Canción agregada!',
        text: 'Pudiste agregar la canción!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }) 

      // window.location.href=`./album.html?album=${albumId}`
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