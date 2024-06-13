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

    agregarTemas(nombre, descripcion){
        let tema = new Tema(nombre, descripcion);
        this.listaTemas.push(tema);
    }

    agregarPreguntas(tema, nivel, textoPregunta, resCorrecta, resIncorrecta){
        let pregunta = new Pregunta(tema, nivel, textoPregunta, resCorrecta, resIncorrecta);
        this.listaPreguntas.push(pregunta);
    }
}
