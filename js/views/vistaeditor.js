import { Vista } from './vista.js'
import { Modelo } from '../modelo.js'

export class Editor extends Vista {
    constructor(controlador, base) {
        super(controlador, base)
    }

    cargarFormulario() {
        const json = Modelo.getCabecera()
        console.log("Datos JSON obtenidos:", json)
    
        const divEditor = document.getElementById('divEditor')
    
        json.campos.forEach(campo => {
            const campoDiv = document.createElement('div')
            campoDiv.classList.add('campo')
    
            switch (campo.tipo) {
                case 'texto':
                    campoDiv.setAttribute('data-type', 'texto')
    
                    const labelTexto = document.createElement('label')
                    labelTexto.textContent = campo.nombre + ":"
                    campoDiv.appendChild(labelTexto)
    
                    const inputTexto = document.createElement('input')
                    inputTexto.setAttribute('type', 'text')
                    inputTexto.setAttribute('name', campo.nombre.toLowerCase())
                    campoDiv.appendChild(inputTexto)
    
                    break
    
                case 'selección':
                    campoDiv.setAttribute('data-type', 'seleccion')
    
                    const labelSeleccion = document.createElement('label')
                    labelSeleccion.textContent = 'Curso:'
                    campoDiv.appendChild(labelSeleccion)
    
                    const select = document.createElement('select')
                    select.setAttribute('name', campo.nombre.toLowerCase())
                    campo.valores.forEach(valor => {
                        const option = document.createElement('option')
                        option.setAttribute('value', valor)
                        option.textContent = valor
                        select.appendChild(option)
                    })
                    campoDiv.appendChild(select)
    
                    break
    
                case 'opciones':
                    campoDiv.setAttribute('data-type', 'opciones')
    
                    const labelModo = document.createElement('label')
                    labelModo.textContent = 'Modo:'
                    campoDiv.appendChild(labelModo)
    
                    campo.valores.forEach((valor, index) => {
                        const inputRadio = document.createElement('input')
                        inputRadio.setAttribute('type', 'radio')
                        inputRadio.setAttribute('name', campo.nombre.toLowerCase())
                        inputRadio.setAttribute('value', valor)
    
                        const labelRadio = document.createElement('label')
                        labelRadio.textContent = campo.valores[index]
    
                        campoDiv.appendChild(inputRadio)
                        campoDiv.appendChild(labelRadio)
                    })
    
                    break
    
                default:
                    break
            }
    
            divEditor.appendChild(campoDiv)
            divEditor.appendChild(document.createElement('br'))
        })
    
        const inputSubmit = document.createElement('input')
        inputSubmit.setAttribute('type', 'button')
        inputSubmit.setAttribute('value', 'Enviar')
        divEditor.appendChild(inputSubmit)

        inputSubmit.addEventListener('click', () => {
            const campos = divEditor.querySelectorAll('.campo')
            const examen = {}
        
            campos.forEach(campo => {
                let dataType = campo.getAttribute('data-type')
                let valor = null
                let nombre = null
                switch (dataType) {
                    case 'texto':
                        valor = campo.querySelector('input[type="text"]').value
                        nombre = campo.querySelector('input[type="text"]').getAttribute('name')
                        examen[nombre] = valor
                        break
                    case 'seleccion':
                        valor = campo.querySelector('select').value
                        nombre = campo.querySelector('select').getAttribute('name')
                        examen[nombre] = valor
                        break
                    case 'opciones':
                        campo.querySelectorAll('input[type="radio"]').forEach(radio => {
                            if (radio.checked) {
                                valor = radio.value
                                console.log("Radio seleccionado:", valor)
                                nombre = radio.getAttribute('name')
                                examen[nombre] = valor
                            }
                        })
                        break
                    default:
                        console.log("Tipo de campo no reconocido:", dataType)
                        break
                }
            })
            console.log("Examen:", examen)
        })
        divEditor.appendChild(inputSubmit)

        /*-------------------------------------------------------*/

        divEditor.appendChild(document.createElement('hr'))
        const tipo = "area"
        const json2 = Modelo.getPregunta(tipo)
        console.log("Datos JSON obtenidos:", json2)

        json2.preguntas.forEach(pregunta => {
            const campoDiv2 = document.createElement('div')
            campoDiv2.classList.add('campo')
    
            switch (tipo) {
                case 'area':
                    campoDiv2.setAttribute('data-type', 'texto')
    
                    const labelTexto = document.createElement('label')
                    labelTexto.textContent = pregunta.nombre + ":"
                    campoDiv2.appendChild(labelTexto)

                    const textareaTexto = document.createElement('textarea')
                    textareaTexto.setAttribute('name', pregunta.nombre.toLowerCase())
                    campoDiv2.appendChild(textareaTexto)
                    break
            }
        })
    }
}