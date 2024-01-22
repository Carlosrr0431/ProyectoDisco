import { onLoad } from "./utils/utils.js";

let flag = [true, true];
let favoritos = [];


let h1log = document.getElementById("h1log");
let btnlog = document.getElementById("btnlog");

let avatarNombre = document.getElementById("avatarNombre");
let avatarEmail = document.getElementById("avatarEmail");

let btnCreate = document.getElementById("btnCreate");
let btnOther = document.getElementById("btnOther");

function submit1(container, albumRes) {

  let svgString2 = `
<svg id="svg1" xmlns="http://www.w3.org/2000/svg" fill="#09090b" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09090b" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>

`;

let svgString3 = `
<svg id="svg1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#09090b" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>

`;

  if (flag[0]) { 
    container.innerHTML = svgString2
    favoritos.push(albumRes.titulo);
    flag[0] = false;
  } else {
    container.innerHTML = svgString3
    favoritos.splice(favoritos.indexOf(albumRes.titulo), 1);
    flag[0] = true;
  }

  alert(favoritos);
}


const redirect = (id) => {
  window.location.href = `./album.html?album=${id}`;
};

const getAlbums = async () => {
  try {
    const response = await axios.get("http://localhost:3000/album");

    response.data.map((elem) => {
      renderAlbum(elem);
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteAlbum = async (elem) => {
  try {
    const album = axios.delete(`http://localhost:3000/album/${elem._id}`, elem);

    if (album) {
      swal({
        title: "Album eliminado!",
        text: "Pudiste eliminar el album!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      window.location.href = `./index.html`;
    }
  } catch (error) {
    swal({
      title: "Album no eliminado!",
      text: "No se pudo eliminar el album",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

btnCreate.addEventListener("click", async () => {
  try {
    const validate = await axios.get("http://localhost:3000/me");

    if (validate.data.name == "JsonWebTokenError") {
      document.location.href = "http://localhost:3000";
    } else {
      document.location.href = "http://localhost:3000/addAlbum.html";
    }
  } catch (error) {
    window.location.href = "http://localhost:3000/login.html";
  }
});

btnlog.addEventListener("click", () => {
  if (document.cookie.includes("jwt")) {
    limpiarCookies();
  } else {
  }
});

btnOther.addEventListener("click", async () => {
  try {
    const validate = await axios.get("http://localhost:3000/me");

    if (validate.data.name == "JsonWebTokenError") {
      alert("Usuario no identificado");
      window.location.href = "http://localhost:3000/login.html";
    } else {
      document.location.href = "http://localhost:3000/index.html";
    }
  } catch (error) {
    window.location.href = "http://localhost:3000/login.html";
  }
});

const gestionarCargaNormal = () => {
  if (document.cookie.includes("jwt")) {
    getAlbums();
    h1log.textContent = "Log Out";
  } else {
    h1log.textContent = "Login";
  }
};

const limpiarCookies = async () => {
  const cookies = await axios.post("http://localhost:3000/logout");
};

const renderAlbum = (albumRes) => {
  const contenedorAlbum = document.getElementById("contenedorAlbum");
  const album = document.createElement("div");
  const buttonFavorito = document.createElement("button");
  const div1 = document.createElement("div");
  const div3 = document.createElement("div");
  const img = document.createElement("img");
  const img2 = document.createElement("img");
  const div2 = document.createElement("div");
  const p = document.createElement("p");
  const fecha = new Date(albumRes.fechaVenta);
  const button3 = document.createElement("button");

  let svgString = `
  <svg id="svg1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>

`;

  let container = document.createElement("div");
  container.setAttribute("class", "w-4 h-4");
  container.innerHTML = svgString;

  button3.addEventListener("click", () => {
    deleteAlbum(albumRes);
  });

  buttonFavorito.addEventListener("click", () => {
    submit1(container, albumRes);
  });

  buttonFavorito.append(container);
  buttonFavorito.setAttribute("class", "translate-x-[70px] bottom-2 relative");

  img2.setAttribute("src", `${"./assets/icons8-eliminar (1).svg"}`);
  img2.setAttribute("class", "color-white");
  button3.appendChild(img2);

  div3.setAttribute("class", "flex justify-between items-center text-center ");

  album.setAttribute("class", "max-w-sm rounded overflow-hidden");
  div1.setAttribute("class", "px-6 py-4");
  div2.setAttribute("class", "font-bold text-xl mb-2 text-white");
  p.setAttribute("class", "text-gray-300 text-base");

  p.textContent = fecha.getFullYear();
  div2.textContent = albumRes.titulo;

  img.addEventListener("click", (event) => {
    redirect(albumRes._id);
  });
  img.setAttribute("class", "w-full rounded-[10px]");
  img.src = albumRes.url ? albumRes.url : "./assets/rescate-indudablemente.jpg"

  div3.appendChild(p);
  div3.appendChild(buttonFavorito);
  div3.appendChild(button3);

  album.appendChild(div1);
  div1.appendChild(img);
  div1.appendChild(div2);
  div1.appendChild(div3);

  contenedorAlbum.appendChild(album);
};



gestionarCargaNormal();
onLoad();
