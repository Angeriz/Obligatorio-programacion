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
    console.log ("goliwis");
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
    sistema.listaTemas.push(new Tema(nombre, descripcion));
    actualizarListaTemas();
    actualizarPromedioPreguntasTema();
    actualizarTemasSinPreguntas();
    alert("Se agregó el tema correctamente");
    form.reset();    
}

function actualizarListaTemas() {
    let listaDeTemas = document.getElementById("listaDTemas");
    listaDeTemas.innerHTML = "";
    for (i = 0; i < sistema.listaTemas.length; i++) {
        let temaDeLaLista = sistema.listaTemas[i];
        let li = document.createElement("li");
        li.textContent = temaDeLaLista.nombre;
        listaDeTemas.appendChild(li)
    }
}

function actualizarPromedioPreguntasTema() {
    let preguntasTema = document.getElementById("preguntaPorTema");
    preguntasTema.innerHTML = "<p id='preguntaPorTema'>Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas): " +  ((sistema.listaPreguntas.length)/(sistema.listaTemas.length)) + " </p>";
}

function actualizarTemasSinPreguntas() {

}
/*ATENCION TENGO QUE HACER ESTA FUNCION DESPUES DE HACER QUE FUNCIONEN LAS PREGUNTAS*/
