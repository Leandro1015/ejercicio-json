import {Vista} from './views/vista.js'
import {Inicio} from './views/vistaeditor.js'
import {Modelo} from './modelo.js'
class Controlador {  
    vistas = new Map()

    constructor() {
        this.modelo = new Modelo()
        this.inicializarVistas()
    }

    inicializarVistas(){
        // Referencia de la interfaz
        const divInicio = document.getElementById('divInicio')
        // Creación de la vista
        const inicio = new Inicio(this, divInicio)
        this.vistas.set(Vista.vinicio, inicio)
        this.verVista(Vista.vinicio)
        //inicio.cargarFormulario() // Llama al método cargarFormulario en la instancia de Inicio
    }

    /**
     * Método para cambiar la vista actual
     * @param {string} vista - Nombre de la vista a mostrar
    */
    verVista(vista) {
        this.ocultarVistas()
        this.vistas.get(vista).mostrar(true)
    }

    // Método para ocultar todas las vistas
    ocultarVistas() {
        for(const vista of this.vistas.values())
            vista.mostrar(false)
    }
}

// Crear una instancia del controlador cuando se carga la página
window.onload = () => { 
    new Controlador()
}
