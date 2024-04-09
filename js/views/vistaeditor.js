import { Vista } from './vista.js'
import { Modelo } from '../modelo.js'

export class Editor extends Vista {
    constructor(controlador, base) {
        super(controlador, base)
        this.formulario = document.createElement('form')
        this.base.appendChild(this.formulario)
    }

    cargarFormulario() {
        const json = Modelo.obtenerJSON()
        console.log("Datos JSON obtenidos:", json)

        const divEditor = document.createElement('div')
        divEditor.id = 'divEditor'

        json.campos.forEach(campo => {
            const label = document.createElement('label')
            label.textContent = campo.nombre + ":"
            divEditor.appendChild(label)

            if (campo.tipo === 'texto') {
                const input = document.createElement('input')
                input.setAttribute('type', 'text')
                input.setAttribute('name', campo.nombre.toLowerCase())
                divEditor.appendChild(input)
            } 
            else 
                if (campo.tipo === 'selección') {
                    const select = document.createElement('select')
                    select.setAttribute('name', campo.nombre.toLowerCase())
                    campo.valores.forEach(valor => {
                        const option = document.createElement('option')
                        option.setAttribute('value', valor)
                        option.textContent = valor
                        select.appendChild(option)
                    })
                divEditor.appendChild(select)
            } 
            else 
                if (campo.tipo === 'opciones') {
                    campo.valores.forEach((valor, index) => {
                        const input = document.createElement('input')
                        input.setAttribute('type', 'radio')
                        input.setAttribute('name', campo.nombre.toLowerCase())
                        input.setAttribute('value', valor)

                        const label = document.createElement('label')
                        label.textContent = campo.valores[index]
                        divEditor.appendChild(input)
                        divEditor.appendChild(label)
                    })
            }
            divEditor.appendChild(document.createElement('br'))
        })

        const inputSubmit = document.createElement('input')
        inputSubmit.setAttribute('type', 'submit')
        inputSubmit.setAttribute('value', 'Enviar')
        divEditor.appendChild(inputSubmit)

        document.body.appendChild(divEditor)

        this.formulario.addEventListener('submit', (event) => {
            event.preventDefault()

            const titulo = this.formulario.querySelector('input[name="titulo"]').value;
            const curso = this.formulario.querySelector('select[name="curso"]').value;
            const modo = this.formulario.querySelector('input[name="modo"]:checked').value;

         
            const jsonData = {
                titulo: titulo,
                curso: curso,
                modo: modo
            }

            console.log(jsonData)
         
            this.controlador.procesarDatos(jsonData)
        })

        divEditor.appendChild(inputSubmit)

        this.formulario.appendChild(divEditor)
    }   
}