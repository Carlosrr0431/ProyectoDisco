import { onLoad } from "./utils/utils.js";


const buttonEdit = document.getElementById("buttonEdit");
const buttonAddSong = document.getElementById("buttonAddSong")
let form = document.getElementById("form")
let titulo = document.getElementById('titulo')
let fechaVenta = document.getElementById('fechaVenta')
let descripcion = document.getElementById('descripcion')
let url = document.getElementById('url')

let avatarNombre = document.getElementById('avatarNombre')
let avatarEmail = document.getElementById('avatarEmail')

form.addEventListener("submit", e => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )

    titulo.value = ""
    fechaVenta.value = ""
    descripcion.value = ""
    url.value = ""

    editAlbum(data)
    console.log(JSON.stringify(data));
})


const editAlbum = async (data) => {

  try {

    const datos = localStorage.getItem("idUsuario")

    const album = await axios.post(`/albums/user/${datos}`, data )


    if ( album ) {
       swal({
        title: 'Album created!',
        text: 'You created the album!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }) 

    } else {
      console.log("No se pudo actualizar el album");
    }
  } catch (error) {
    swal({
      title: 'Album no creado!',
      text: 'No se pudo crear el album',
      icon: 'error',
      confirmButtonText: 'Ok'
    }) 
  }
}

btnLog.addEventListener('click',  () => {
  if ( document.cookie.includes("jwt") ) {

     limpiarCookies()
      
  } else {
   
  }
})

const limpiarCookies = async () => {

  const cookies = await axios.post('/logout')



}

onLoad()