let span = document.querySelector("#welcome")
let tickets = [10, 10, 10, 10, 10]

let img = document.getElementById("img");

let form = document.getElementById("form");

let tabla = document.getElementById("tabla")

let nombre = "";
let edad = "";

let input = document.getElementById("entrada");
let input2 = document.getElementById("edad");

input.addEventListener("keydown", (e) => {
    if ( e.key == "CapsLock" || e.key == "Enter" || e.key == "Control" || e.key == "Alt" || e.key == "Tab" ) {
        return
    } else if ( e.key == "Backspace" ) {
        nombre = nombre.slice(0, nombre.length -1 )
    } else
        nombre = nombre + e.key

     
});

input2.addEventListener("keydown", (e) => {
  if ( e.key == "CapsLock" || e.key == "Enter" || e.key == "Control" || e.key == "Alt" || e.key == "Tab" ) {
      return
    } else if ( e.key == "Backspace" ) {
      edad = edad.slice(0, nombre.length -1 )
  } else
      edad = edad + e.key
   
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  
  input.value = ""
  input2.value = ""

  if ( nombre.length <= 3 ) {
    alert("Ingrese un nombre con más de tres digitos")
  } else {
    span.textContent = "Hola, " + nombre
    nombre = ""
  }

  console.log(edad);

  if ( parseInt(edad) <= parseInt("17") ) {
    Swal.fire({
      title: "Lo siento!",
      text: `No podrá adquirir Tickets`,
      icon: "error"
    });

    edad = ""
    tabla.style.visibility = "hidden"
  
  } else {
    edad = ""
    tabla.style.visibility = "visible"
   
  }

 

});

function getTickets(orden) {

    if (tickets[orden] > 0 ){
        tickets[orden]--;
        return tickets[orden]+1;
    } else 
        return 0;
    
}


function responseButton(e) {
    let resp = getTickets(e.target.id)
    let id1 = parseInt(e.target.id) + 1
    let id2 = parseInt(e.target.id) + 1

   

    let td1 = document.getElementById("f"+id1)
    let td2 = document.getElementById("d"+id2)
    let bd3 = document.getElementById(e.target.id)

    

    if (resp) {
        Swal.fire({
            title: "Felicitaciones!",
            text: `Compraste el ticket numero ${resp} para el ${td1.innerText} en ${td2.innerHTML}`,
            icon: "success"
          });

       

    } else {
        Swal.fire({
            title: "Lo siento!",
            text: `No hay más tickets para el ${td1.innerText} en ${td2.innerHTML}`,
            icon: "error"
          });

          bd3.textContent = "Sould Out"


    }
}

img.setAttribute("style", "visibility: visible;");
