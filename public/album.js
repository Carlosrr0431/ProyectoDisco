const editAlbum = document.getElementById('editAlbum')
const addSong = document.getElementById('addSong')
const albumId = window.location.search.substring(7);

const caracter = /%20/g;
const cadena = albumId.replace(caracter, ' ')

editAlbum.addEventListener('click', () => {
  editAlbum.setAttribute('href', `/editAlbum.html?album=${cadena}`)
})

addSong.addEventListener('click', () => {
  addSong.setAttribute('href', `/addSong.html?album=${cadena}` )
})



const renderAlbum = (album) => {


  const titulo = document.getElementById("titulo");
  const fechaVenta = document.getElementById("fecha");
  const tablaMayor = document.getElementById("tablaMayor");
  const cantCanciones = document.getElementById("cantCanciones");
  const fecha = new Date(album.fechaVenta);
  const dia = fecha.toLocaleDateString();
  const tabla = document.createElement("tbody");
  const imagen = document.getElementById("imagen")


  imagen.setAttribute('src', album.url)
  
  tabla.setAttribute("class", "border-collapse border-t border-slate-500");
  tablaMayor.appendChild(tabla);

  album.canciones.map((elem, i) => {
    const tr = document.createElement("tr");
    const tdTitulo = document.createElement("td");
    const tdDuracion = document.createElement("td");
    const tdImagen = document.createElement("td");
    const imagen = document.createElement("img");
    const tdAudio = document.createElement("td");
    const audio = document.createElement("audio");
    const source = document.createElement("source");
    const button = document.createElement("button");
    const button2 = document.createElement("button");
    const button3 = document.createElement("button")

    tr.setAttribute(
      "class",
      "border-collapse border-t border-slate-500"
    );
    tabla.appendChild(tr);

    let svgString = `
    <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
    <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z"/>
  </svg>
  
  `;

    let svgString2 = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
  <path d="M3 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm7 0H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
</svg>`;

    let container = document.createElement("div");
    container.setAttribute("class", "w-4 h-4 text-black mr-5");
    container.innerHTML = svgString;

    let container2 = document.createElement("div");
    container2.setAttribute("class", "w-4 h-4 text-black");
    container2.innerHTML = svgString2;

    //audios
    source.setAttribute("src", "./assets/Y2meta.app - Y Además (128 kbps).mp3");
    source.setAttribute("preload", "auto");

    audio.id = "player";
    audio.appendChild(source);

    button.appendChild(container);
    button.addEventListener("click", () => {
      audio.play();
    });

    button2.appendChild(container2);
    button2.addEventListener("click", () => {
      audio.pause();
    });

    tdAudio.appendChild(audio);
    tdAudio.appendChild(button);
    tdAudio.appendChild(button2);

    //

    tdTitulo.textContent = `${i + 1}. ${elem.titulo}`;
    tdDuracion.textContent = new Date(elem.duracion).toISOString().slice(14, 19);
    imagen.setAttribute("src", `${"./assets/icons8-eliminar (1).svg"}`);
    imagen.setAttribute("class", "");
    button3.appendChild(imagen)
    button3.addEventListener('click', () => {

      deleteSong(elem)

    })

    tdImagen.appendChild(button3);

    tr.appendChild(tdTitulo);
    tr.appendChild(tdDuracion);
    tr.appendChild(tdImagen);
    tr.appendChild(tdAudio);
  });

  cantCanciones.textContent = `${album.canciones.length} canciones`;
  titulo.textContent = album.titulo;
  fechaVenta.textContent = dia;
};

const getAlbum = async () => {

  const id = localStorage.getItem('idUsuario')

  try {
    const response = await axios.get(
      `/album/user/${id}/${cadena}`
    );

      
    renderAlbum(response.data[0]);
  } catch (error) {
    console.error(error);
  }
};

getAlbum();

const deleteSong = async(elem) => {

  try {
    const song = axios.put(`/canciones/quitar/${cadena}`, elem )

    if (song) {
      swal({
        title: 'Canción quitada!',
        text: 'Pudiste agregar la canción!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      window.location.href=`/album.html?album=${cadena}`
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
