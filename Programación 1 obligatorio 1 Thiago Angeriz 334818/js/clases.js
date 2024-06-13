class Tema {
    constructor (nombre, descripcion) {
     this.nombre = nombre;
     this.descripcion = descripcion;
    }
}

class Pregunta {
    constructor (tema, nivel, textoPregunta, resCorrecta, resIncorrecta) {
        this.tema = tema;
        this.nivel = nivel;
        this.textoPregunta = textoPregunta;
        this.resCorrecta = resCorrecta;
        this.resIncorrecta = resIncorrecta;
    }
}

class Sistema {
    constructor() {
        this.listaTemas = [];
        this.listaPreguntas = [];
    }
}
