/* Thiago Anegriz 334818 */

/* Funciones para que se muestre en pantalla el hipervinculo seleccionado */
function mostrarInformacionGeneral(){
    document.getElementById("desGeneral").style.display = "block";
    document.getElementById("gestionTemas").style.display = "none";
    document.getElementById("gestionPreguntas").style.display = "none";
    document.getElementById("jugarConfiguracion").style.display = "none";
    document.getElementById("jugarJuego").style.display = "none";
}
function mostrarAdministrar(){
    document.getElementById("desGeneral").style.display = "none";
    document.getElementById("gestionTemas").style.display = "block";
    document.getElementById("gestionPreguntas").style.display = "block";
    document.getElementById("jugarConfiguracion").style.display = "none";
    document.getElementById("jugarJuego").style.display = "none";
}
function mostrarJugar(){
    document.getElementById("desGeneral").style.display = "none";
    document.getElementById("gestionTemas").style.display = "none";
    document.getElementById("gestionPreguntas").style.display = "none";
    document.getElementById("jugarConfiguracion").style.display = "block";
    document.getElementById("jugarJuego").style.display = "none";
}
function mostrarJugarCompleto(){
    document.getElementById("desGeneral").style.display = "none";
    document.getElementById("gestionTemas").style.display = "none";
    document.getElementById("gestionPreguntas").style.display = "none";
    document.getElementById("jugarConfiguracion").style.display = "block";
    document.getElementById("jugarJuego").style.display = "block";    
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
    agregarTemaAJuego();
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
    let minR = 255, minG = 255, minB = 0;
    let maxR = 139, maxG = 69, maxB = 19;
    
    let r = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
    let g = Math.floor(Math.random() * (maxG - minG + 1)) + minG;
    let b = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
    
    let colorHex = '#' + pasarRGB(r) + pasarRGB(g) + pasarRGB(b);
    return colorHex;
}
    
function pasarRGB(rgb) {
    let hex = rgb.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}



/*Funciones para agregar preguntas y que se actualice la lista*/
document.addEventListener("DOMContentLoaded", function() {
    iniciarAgregarPregunta();
});

document.addEventListener("DOMContentLoaded", function() {
    clickOrdenPreguntas();
});


function iniciarAgregarPregunta() {
    document.getElementById("botonAgregarADP").addEventListener("click", agregarPregunta);
}

function agregarPregunta(){
let tema = document.getElementById("temaADP").value;
let nivel = document.getElementById("nivelADP").value;
let textoPregunta = document.getElementById("textoDeLaPreguntaADP").value;
let resCorrecta = document.getElementById("respuestaCorrectaADP").value;

let resIncorrecta = document.getElementById("respuestasIncorrectasADP").value.split(",").map(palabra => palabra.trim());;

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

for (i = 0; i < resIncorrecta.length; i++){
    if(resCorrecta.toUpperCase() === resIncorrecta[i].toUpperCase()){
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
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    if (radio1.checked) {
        ordenarPreguntasAscendente();
    } else if (radio2.checked) {
        ordenarPreguntasDescendente();
    }
    
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

function ordenarPreguntasAscendente() {
    sistema.listaPreguntas.sort((a, b) => {
        if (a.tema.toLowerCase() < b.tema.toLowerCase()) {
            return -1;
        } else if (a.tema.toLowerCase() > b.tema.toLowerCase()) {
            return 1;
        } else {
            return a.nivel - b.nivel;
        }
    });
}

function ordenarPreguntasDescendente() {
    sistema.listaPreguntas.sort((a, b) => {
        if (a.tema.toLowerCase() > b.tema.toLowerCase()) {
            return -1;
        } else if (a.tema.toLowerCase() < b.tema.toLowerCase()) {
            return 1;
        } else {
            return a.nivel - b.nivel;
        }
    });
}

function clickOrdenPreguntas() {
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");

    radio1.addEventListener("click", actualizarTablaPreguntas)
    radio2.addEventListener("click", actualizarTablaPreguntas)
}



/*Funciones para jugar*/
document.addEventListener("DOMContentLoaded", function() {
    iniciarJogar();
});

function agregarTemaAJuego(){
    let seleccionar = document.getElementById("temaJuego");
    seleccionar.innerHTML = "";
for (i = 0; i < sistema.listaTemas.length; i++) {
    let tema = sistema.listaTemas[i];
    let opcion = document.createElement("option");
    opcion.text = tema.nombre;
    seleccionar.appendChild(opcion);
    }
}

function iniciarJogar() {
    document.getElementById("botonJugar").addEventListener("click", jogar);
}

let puntaje = 0;
let puntajeMaximo = 0;
let terminarJuego = false;

async function jogar() {
    let temaJuego = document.getElementById("temaJuego").value;
    let nivelJuego = document.getElementById("nivelJuego").value;
    let a = [];
    let b = [];
    let lista = sistema.listaPreguntas;
    let ayudaBoton = document.getElementById("ayudaBoton");
    let terminarBoton = document.getElementById("terminarBoton");

    let puntajePartida = document.getElementById("puntajePartida");
    puntaje = 0;
    terminarJuego = false;

    document.getElementById("temaJuego").disabled = true;
    document.getElementById("nivelJuego").disabled = true;
    document.getElementById("siguientePregunta").disabled = true;
    document.getElementById("ayudaBoton").disabled = true;
    document.getElementById("terminarBoton").disabled = false;

    for (let i = 0; i < lista.length; i++) {
        if (temaJuego === lista[i].tema && nivelJuego == lista[i].nivel) {
            a.push(lista[i]);
        }
    }
    for (let i = 0; i < a.length; i++) {
        let aux = false;
        while (!aux) {
            let random = Math.floor(Math.random() * a.length);
            if (b[random] === undefined) {
                b[random] = a[i];
                aux = true;
            }
        }
    }

    mostrarJugarCompleto();

    let formPreguntasRespuestas = document.getElementById("formPreguntasRespuestas");
    formPreguntasRespuestas.innerHTML = "";

    terminarBoton.addEventListener("click", finalizarJuego);

    for (let i = 0; i < b.length && !terminarJuego; i++) {
        formPreguntasRespuestas.innerHTML = "";

        let colorTemaDePregunta = '';

        for (let j = 0; j < sistema.listaTemas.length; j++) {
            if (sistema.listaTemas[j].nombre === b[i].tema) {
                colorTemaDePregunta = sistema.listaTemas[j].color;
            }
        }
        let textoDePregunta = document.createElement("p");
        textoDePregunta.id = "textoDeLaPregunta";
        textoDePregunta.textContent = b[i].textoPregunta;
        textoDePregunta.style.backgroundColor = colorTemaDePregunta;
        formPreguntasRespuestas.appendChild(textoDePregunta);

        console.log(b[i])
        let respuestasTotales= b[i].resIncorrecta.concat(b[i].resCorrecta);
        let ordenRespuestas = [];

        for (let j = 0; j < respuestasTotales.length; j++) {
            let aux = false;
            while (!aux) {
                let azar = Math.floor(Math.random() * respuestasTotales.length);
                if (ordenRespuestas[azar] === undefined) {
                    ordenRespuestas[azar] = respuestasTotales[j];
                    aux = true;
                }
            }
        }

        for (let j = 0; j < ordenRespuestas.length; j++) {
            let boton = document.createElement("button");
            boton.textContent = ordenRespuestas[j];
            boton.style.backgroundColor = colorTemaDePregunta;
            boton.style.height = "40px";
            boton.style.width = "130px";
            boton.style.marginLeft = "20px";
            boton.style.borderWidth = "2px";
            boton.style.border = "solid";
            boton.style.textAlign = "center";
            boton.style.lineHeight = "30px";
            boton.style.color = "white";
            boton.style.borderColor = "white";
            boton.addEventListener("click", () => {
                verificarResCorrecta(boton, ordenRespuestas[j], b[i].resCorrecta, puntajePartida);
            });
            formPreguntasRespuestas.appendChild(boton);
        }

        document.getElementById("ayudaBoton").disabled = false;
        ayudaBoton.onclick = () => {
            alert("La primer letra de la respuesta es: " + b[i].resCorrecta[0]);
        };

        await siguientePregunta();
    }

    alert("Haz finalizado tu juego, tu puntaje es: " + puntaje);

    if (puntaje > puntajeMaximo) {
        alert("¡Felicidades! Superaste el puntaje máximo");
        puntajeMaximo = puntaje;
        document.getElementById("maximoPuntaje").textContent = "Máximo puntaje obtenido por un jugador: " + puntajeMaximo;
    }

    document.getElementById("temaJuego").disabled = false;
    document.getElementById("nivelJuego").disabled = false;
    document.getElementById("siguientePregunta").disabled = true;
    document.getElementById("ayudaBoton").disabled = true;
    document.getElementById("terminarBoton").disabled = true;

    mostrarJugar();
    terminarBoton.removeEventListener("click", finalizarJuego);
}

function finalizarJuego() {
    terminarJuego = true;
    let siguientePregunta = document.getElementById("siguientePregunta");
    let clickear = new Event("click");
    siguientePregunta.dispatchEvent(clickear);
}

let sonidoAcierto = new Audio('audio/acierto.mp3');
let sonidoError = new Audio('audio/error.mp3');

function verificarResCorrecta(boton, resElegida, respCorrecta, puntajePartida) {
    let botones = document.querySelectorAll("#formPreguntasRespuestas button");
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }

    document.getElementById("siguientePregunta").disabled = false;
    document.getElementById("ayudaBoton").disabled = true;

    if (resElegida === respCorrecta) {
        boton.style.backgroundColor = "green";
        sonidoAcierto.play();
        puntaje += 10;
    } else {
        boton.style.backgroundColor = "red";
        sonidoError.play();
        puntaje -= 1;
    }
    puntajePartida.textContent = "Puntaje acumulado en esta partida: " + puntaje;
}

function siguientePregunta() {
    return new Promise((resolve) => {
        let siguientePregunta = document.getElementById("siguientePregunta");

        function pasarPregunta() {
            siguientePregunta.removeEventListener("click", pasarPregunta);
            resolve();
        }

        siguientePregunta.addEventListener("click", pasarPregunta);
    });
}



/* Funciones para agregar temas y preguntas ya dados */
document.addEventListener("DOMContentLoaded", function() {
let respuesta = confirm("¿Desea usar los temas y preguntas ya preparados en la página?");
if (respuesta) {
    preguntasPreparadas();
    actualizarTodo();
}
});

function preguntasPreparadas() {
    for(i = 0; i < preguntas.length; i++){
        let aux = false;
        for(j = 0; j < sistema.listaTemas.length; j++){
            if(preguntas[i].tema.nombre === sistema.listaTemas[j].nombre){
                aux = true;
            }
        }
        if(!aux){
           sistema.agregarTemas(preguntas[i].tema.nombre, preguntas[i].tema.descripcion, crearColorTema()); 
        }
    }

    for(k = 0; k < preguntas.length; k++){
        let preguntaNueva = preguntas[k];
        sistema.agregarPreguntas(preguntaNueva.tema.nombre, preguntaNueva.nivel, preguntaNueva.texto, preguntaNueva.respuestaCorrecta, preguntaNueva.respuestasIncorrectas);
    }
}

function actualizarTodo() {
    actualizarListaTemas();
    actualizarPromedioPreguntasTema();
    actualizarTemasSinPreguntas();
    agregarTemaAPregunta();
    agregarTemaAJuego();
    actualizarNumeroListaDeTemas();
    actualizarPreguntasRegistradas();
    actualizarTablaPreguntas();
}
