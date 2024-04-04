import { Vista } from './vista.js'
import {Modelo} from '../modelo.js'
export class Inicio extends Vista {
    constructor(controlador, base) {
        super(controlador, base)
        this.formulario = document.createElement('form')
        this.base.appendChild(this.formulario)
    }

    cargarFormulario() {
        console.log("Construyendo formulario...")

        const json = Modelo.obtenerJSON()
        console.log("Datos JSON obtenidos:", json)

        json.campos.forEach(campo => {
            const input = document.createElement('input')
            input.setAttribute('type', campo.tipo)
            input.setAttribute('name', campo.nombre)

            if (campo.tipo === 'selección' || campo.tipo === 'opciones') {
                campo.valores.forEach(valor => {
                    const option = document.createElement('option')
                    option.value = valor
                    option.textContent = valor
                    input.appendChild(option)
                })
            }

            this.formulario.appendChild(input)
        })
    }
}
