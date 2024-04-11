import {Vista} from './views/vista.js'
import {Editor} from './views/vistaeditor.js'
import {Modelo} from './modelo.js'
class Controlador {  
    vistas = new Map()

    constructor() {
        this.modelo = new Modelo()
        this.inicializarVistas()
    }

    inicializarVistas(){
        // Referencia de la interfaz
        const divEditor = document.getElementById('divEditor')
        // Creación de la vista
        const editor = new Editor(this, divEditor)
        this.vistas.set(Vista.veditor, editor)
        this.verVista(Vista.veditor)
        // Llama al método cargarFormulario en la instancia de Editor
        editor.cargarFormulario() 
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
