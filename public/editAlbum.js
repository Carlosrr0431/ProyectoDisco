import { onLoad } from "./utils/utils.js";

const buttonEdit = document.getElementById("buttonEdit");
const buttonAddSong = document.getElementById("buttonAddSong")


const albumId = window.location.search.substring(7);
const caracter = /%20/g;
const cadena = albumId.replace(caracter, ' ')

let form = document.getElementById("form")
let titulo = document.getElementById('titulo')
let fechaVenta = document.getElementById('fechaVenta')
let descripcion = document.getElementById('descripcion')
let avatarNombre = document.getElementById("avatarNombre");
let avatarEmail = document.getElementById("avatarEmail");
let url = document.getElementById('url')



function editEvent() {
    
  window.location.href = `/editAlbum.html?album=${cadena}`
}

const addSongEvent = () => {
  window.location.href = `/addSong.html?album=${cadena}`
}




const cancelEvent = () => {
  window.location.href=`/album.html?album=${cadena}`
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
    const userId = localStorage.getItem('idUsuario')

    const album = await axios.put(`/album/user/${userId}/${cadena}`, data )


    if ( album ) {
       swal({
        title: 'Album edited!',
        text: 'You modified the album!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }) 

      window.location.href=`/album.html?album=${cadena}`
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

// cargaNormal()


