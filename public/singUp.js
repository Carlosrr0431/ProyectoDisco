let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  if (JSON.stringify(data["contraseña"]).length <= 8) {
    Swal.fire({
      title: "Completé la contraseña con más de 6 digitos",
      text: ``,
      icon: "error",
    });
  } else {
    registrar(data);
  }
});

const registrar = async (data) => {
  try {
    const usuario = await axios.post("http://localhost:3000/usuarios", data);

    if (usuario) {
      
        Swal.fire({
            title: "Felicidades, se registro correctamente!",
            text: ``,
            icon: "success"
          });
      window.location.href = "./login.html";
    } else console.log("No se pudo crear el usuario");
  } catch (error) {
    console.error(error);
  }
};
