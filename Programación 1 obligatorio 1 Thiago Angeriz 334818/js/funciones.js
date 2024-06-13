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
    sistema.agregarTemas(nombre, descripcion);
    actualizarListaTemas();
    actualizarPromedioPreguntasTema();
    actualizarTemasSinPreguntas();
    agregarTemaAPregunta();
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
    preguntasTema.innerHTML = "<p id='preguntaPorTema'>Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas): " +  ((sistema.listaPreguntas.length) / (sistema.listaTemas.length)) + " </p>";
}

function actualizarTemasSinPreguntas() {

}
/*ATENCION TENGO QUE HACER ESTA FUNCION DESPUES DE HACER QUE FUNCIONEN LAS PREGUNTAS*/




/*Funciones para gregar preguntas y que se actualice la lista*/
function agregarTemaAPregunta(){
    let seleccionar = document.getElementById("temaADP");
for (i = 0; i < sistema.listaTemas.length; i++) {
    let tema = sistema.listaTemas[i];
    let opcion = document.createElement("option");
    opcion.text = tema.nombre;
    opcion.value = i
    seleccionar.appendChild(opcion);
}}


document.addEventListener("DOMContentLoaded", function() {
    iniciarAgregarPregunta();
});


function iniciarAgregarPregunta() {
    document.getElementById("botonAgregarADP").addEventListener("click", agregarPregunta);
}



function agregarPregunta(){
let tema = document.getElementById("temaADP").textContent;
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
alert ("Se añadió la pregunta correctamente");
formP1.reset();
formP2.reset();
}

