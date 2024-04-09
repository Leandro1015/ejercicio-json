export class Vista {
    static {
      Vista.vinicio = Symbol('Editor')
    }
    
    // Constructor de la clase Vista
    constructor(controlador, base) {
      this.controlador = controlador
      this.base = base
    }
  
    mostrar(ver) {
      if (ver)
        this.base.style.display = 'block' // Mostrar la vista
      else 
        this.base.style.display = 'none' // Ocultar la vista
    }
}