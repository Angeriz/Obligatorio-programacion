/* Funciones para que se muestre en pantalla el hipervinculo seleccionado */
function mostrarInformacionGeneral(){
    document.getElementById("desGeneral").style.display = "block";
    document.getElementById("gestionTemas").style.display = "none";
    document.getElementById("gestionPreguntas").style.display = "none";
    document.getElementById("jugar").style.display = "none";
}
function mostrarAdministrar(){
    document.getElementById("desGeneral").style.display = "none";
    document.getElementById("gestionTemas").style.display = "block";
    document.getElementById("gestionPreguntas").style.display = "block";
    document.getElementById("jugar").style.display = "none";
}
function mostrarJugar(){
    document.getElementById("desGeneral").style.display = "none";
    document.getElementById("gestionTemas").style.display = "none";
    document.getElementById("gestionPreguntas").style.display = "none";
    document.getElementById("jugar").style.display = "block";
}





/*Funciones para agregar temas y que se actualice las listas*/
document.addEventListener("DOMContentLoaded", function() {
    iniciarAgregarTema();
});

function iniciarAgregarTema() {
    document.getElementById("botonAgregarADT").addEventListener("click", agregarTema);
}

const sistema = new Sistema();

function agregarTema() {
    let nombre = document.getElementById("nombreADT").value;
    let descripcion = document.getElementById("descripcionADT").value;
    let color = crearColorTema();
    let form = document.getElementById("formularioTemas");
    if(!form.checkValidity()){
        alert("Se debe ingresar un nombre y una descripcion del tema");
        return;  
    }

    for (i = 0; i < sistema.listaTemas.length; i++) {
        if (nombre.toUpperCase() === sistema.listaTemas[i].nombre.toUpperCase()) {
            alert("Ya existe un tema con ese nombre");
            return;
        }
    }
    sistema.agregarTemas(nombre, descripcion, color);
    actualizarListaTemas();
    actualizarPromedioPreguntasTema();
    actualizarTemasSinPreguntas();
    agregarTemaAPregunta();
    actualizarNumeroListaDeTemas();
    alert("Se agregó el tema correctamente");
    form.reset();    
}

function actualizarListaTemas() {
    let listaDeTemas = document.getElementById("listaDTemas");
    listaDeTemas.innerHTML = "";
    for (i = 0; i < sistema.listaTemas.length; i++) {
        let temaDeLaLista = sistema.listaTemas[i];
        let li = document.createElement("li");
        li.textContent = temaDeLaLista.nombre + ": " + temaDeLaLista.descripcion;
        listaDeTemas.appendChild(li)
    }
}

function actualizarPromedioPreguntasTema() {
    let preguntasTema = document.getElementById("preguntaPorTema");
    preguntasTema.textContent = "Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas): " +  ((sistema.listaPreguntas.length) / (sistema.listaTemas.length)).toFixed(2);
}

function actualizarTemasSinPreguntas() {
    let cantidadTemasSinPreguntas = document.getElementById("cantidadTemasSinPreguntas");
    let contadorTemasSinPreguntas = 0;
    for (let i = 0; i < sistema.listaTemas.length; i++){
        let temaSinPregunta = true;
        let comparacionTemas = sistema.listaTemas[i].nombre;
        for (let j = 0; j < sistema.listaPreguntas.length; j++){
            let comparacionPreguntas = sistema.listaPreguntas[j].tema;
            if (comparacionTemas === comparacionPreguntas){
               temaSinPregunta = false;
           }
         }
    if (temaSinPregunta === true){
            contadorTemasSinPreguntas++;
        }
    }
  cantidadTemasSinPreguntas.textContent = contadorTemasSinPreguntas;
}

function actualizarNumeroListaDeTemas() {
    let cantidadListaDeTemas = document.getElementById("numeroListaDeTemas");
    cantidadListaDeTemas.textContent = "Lista de temas(total de temas: " + sistema.listaTemas.length + ")"
}

function crearColorTema(){
    let colorRandom = Math.floor(Math.random() * 0xFFFFFF);
    let hexString = colorRandom.toString(16);
    return "#" + hexString.padStart(6, "0");
}



/*Funciones para agregar preguntas y que se actualice la lista*/
document.addEventListener("DOMContentLoaded", function() {
    iniciarAgregarPregunta();
});


function iniciarAgregarPregunta() {
    document.getElementById("botonAgregarADP").addEventListener("click", agregarPregunta);
}

function agregarPregunta(){
let tema = document.getElementById("temaADP").value;
let nivel = document.getElementById("nivelADP").value;
let textoPregunta = document.getElementById("textoDeLaPreguntaADP").value;
let resCorrecta = document.getElementById("respuestaCorrectaADP").value;

let resIncorrecta = document.getElementById("respuestasIncorrectasADP").value;
let resIncorrectas = resIncorrecta.split(",");
let arrayResIncorrectas = resIncorrectas.map(palabra => palabra.trim());

let formP1 = document.getElementById("formularioPreguntas1");
let formP2 = document.getElementById("formularioPreguntas2");

if(!formP1.checkValidity()){
    alert("Se debe rellenar cada espacio para crear una pregunta");
    return;  
}

if(!formP2.checkValidity()){
    alert("Se debe rellenar cada espacio para crear una pregunta");
    return;  
}

for (i = 0; i < sistema.listaPreguntas.length; i++) {
    if (textoPregunta.toUpperCase() === sistema.listaPreguntas[i].textoPregunta.toUpperCase()) {
        alert("Ya existe esa pregunta, intenta crear otra");
        return;
    }
}

for (i = 0; i < arrayResIncorrectas.length; i++){
    if(resCorrecta.toUpperCase() === arrayResIncorrectas[i].toUpperCase()){
        alert("La respuesta correcta no puede estar entre las respuestas incorrectas");
        return;
    }
}

sistema.agregarPreguntas(tema, nivel, textoPregunta, resCorrecta, resIncorrecta);
actualizarPromedioPreguntasTema();
actualizarTemasSinPreguntas();
actualizarPreguntasRegistradas();
actualizarTablaPreguntas();
alert ("Se añadió la pregunta correctamente");
formP1.reset();
formP2.reset();
}

function agregarTemaAPregunta(){
    let seleccionar = document.getElementById("temaADP");
    seleccionar.innerHTML = "";
for (i = 0; i < sistema.listaTemas.length; i++) {
    let tema = sistema.listaTemas[i];
    let opcion = document.createElement("option");
    opcion.text = tema.nombre;
    seleccionar.appendChild(opcion);
    }
}

function actualizarPreguntasRegistradas() {
    let preguntasRegistradas = document.getElementById("preguntasRegistradas");
    preguntasRegistradas.textContent = "Total de preguntas registradas: " + sistema.listaPreguntas.length + " preguntas";
}

function maxPuntajeObtenido(){

}
/* HACER ESTA FUNCION CUANDO HAGA EL JUEGO */

function actualizarTablaPreguntas() {
    let bodyTablaPreguntas = document.getElementById("bodyTablaPreguntas");
    bodyTablaPreguntas.innerHTML = "<tbody id='bodyTablaPreguntas'>" +
    "</tbody>";
    for (i = 0; i < sistema.listaPreguntas.length; i++) {
        let nuevaFila = document.createElement("tr");
        let preguntaFila = sistema.listaPreguntas[i];

        for (j = 0; j < sistema.listaTemas.length; j++){
            if (sistema.listaTemas[j].nombre === preguntaFila.tema){
                colorTema = sistema.listaTemas[j].color;
            }
        }

        let celdaTema = document.createElement("td");
        celdaTema.textContent = preguntaFila.tema;
        celdaTema.style.backgroundColor = colorTema;
        nuevaFila.appendChild(celdaTema);

        let celdaNivel = document.createElement("td");
        celdaNivel.textContent = preguntaFila.nivel;
        celdaNivel.style.backgroundColor = colorTema;
        nuevaFila.appendChild(celdaNivel);

        let celdaTextoPregunta = document.createElement("td");
        celdaTextoPregunta.textContent = preguntaFila.textoPregunta;
        celdaTextoPregunta.style.backgroundColor = colorTema;
        nuevaFila.appendChild(celdaTextoPregunta);

        let celdaResCorrecta = document.createElement("td");
        celdaResCorrecta.textContent = preguntaFila.resCorrecta;
        celdaResCorrecta.style.backgroundColor = colorTema;
        nuevaFila.appendChild(celdaResCorrecta);

        let celdaResIncorrecta = document.createElement("td");
        celdaResIncorrecta.textContent = preguntaFila.resIncorrecta;
        celdaResIncorrecta.style.backgroundColor = colorTema;
        nuevaFila.appendChild(celdaResIncorrecta);

        bodyTablaPreguntas.appendChild(nuevaFila);
    }
}