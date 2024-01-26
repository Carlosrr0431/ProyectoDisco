
let form = document.getElementById("form")

form.addEventListener("submit", async(e) => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )



    if ( JSON.stringify(data["password"]).length <= 8  ) {

          Swal.fire({
            title: "Completé la contraseña con más de 6 digitos",
            text: ``,
            icon: "error"
          });

       

    } else {


      if ( await validateUser(data) ) {


    
        Swal.fire({
            title: "Felicidades, ingreso correctamente!",
            text: ``,
            icon: "success"
          });

          window.location.href = "./";
        } else {



          Swal.fire({
            title: "La contraseña o email son incorrectos",
            text: ``,
            icon: "error"
          });
        }
      
     
    
      
      
    }
})

const validateUser = async (data) => {

  const login = await axios.post(`/login`, data)

  if ( login.statusText = "OK"){
    return true
  } else 
    return false

}
