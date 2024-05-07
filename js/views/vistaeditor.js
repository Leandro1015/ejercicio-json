import { Vista } from './vista.js'
import { Modelo } from '../modelo.js'
import { Descargar } from '../service/descargar.js'

export class Editor extends Vista {
    constructor(controlador, base) {
        super(controlador, base)
    }

    cargarFormulario() {
        const json = Modelo.getCabecera()
        const divEditor = document.getElementById('divEditor')
    
        const divCabecera = document.createElement('div')
        divCabecera.classList.add('divCabecera')

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

            divCabecera.appendChild(campoDiv)
            divCabecera.appendChild(document.createElement('br'))
        })

        divEditor.appendChild(divCabecera)
    
        const inputSubmit = document.createElement('input')
        inputSubmit.setAttribute('type', 'button')
        inputSubmit.setAttribute('value', 'Enviar')
        divCabecera.appendChild(inputSubmit)

        inputSubmit.addEventListener('click', () => {
            const examen = {}
            
            divCabecera.querySelectorAll('.campo').forEach(campo => {
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

            // Crear un array vacío para las preguntas
            examen.preguntas = []

            // Recorrer cada divPregunta y recopilar sus campos
            divPreguntas.querySelectorAll('.divPregunta').forEach(divPregunta => {
                const pregunta = {};
                divPregunta.querySelectorAll('.campo').forEach(campo => {
                    console.log("Campo:", campo);
                    let dataType = campo.getAttribute('data-type');
                    let valor = null;
                    let nombre = null;
                
                    switch (dataType) {
                        case 'textarea':
                            valor = campo.querySelector('textarea').value;
                            nombre = campo.querySelector('textarea').getAttribute('name');
                            pregunta[nombre] = valor;
                            break;
                        case 'numero':
                            valor = campo.querySelector('input[type="number"]').value;
                            nombre = campo.querySelector('input[type="number"]').getAttribute('name');
                            pregunta[nombre] = valor;
                            break;
                        default:
                            console.log("Tipo de campo no reconocido:", dataType);
                            break;
                    }
                })
                examen.preguntas.push(pregunta)
            })

            console.log("Examen:", examen)
            
            // Llamada a la función download
            Descargar.download('examen.txt', JSON.stringify(examen))
        })

        divCabecera.appendChild(inputSubmit)

        /*--------------------------------------------------------*/

        divEditor.appendChild(document.createElement('hr'))

        // Crear un nuevo div para las preguntas
        const divPreguntas = document.createElement('div')
        divPreguntas.classList.add('divPreguntas')

        // Crear un nuevo div para cada pregunta
        const divPregunta = document.createElement('div')
        divPregunta.classList.add('divPregunta')

        const tipo = "area"
        const json2 = Modelo.getPregunta(tipo)

        json2.preguntas.forEach(pregunta => {
            this.generarCamposPregunta(divPregunta, pregunta)
        })

        const selectTipoPregunta = document.createElement('select');
        selectTipoPregunta.setAttribute('name', 'tipoPregunta');
        const optionTexto = document.createElement('option');
        optionTexto.value = 'texto';
        optionTexto.textContent = 'Texto';
        const optionArea = document.createElement('option');
        optionArea.value = 'area';
        optionArea.textContent = 'Área';
        selectTipoPregunta.appendChild(optionTexto);
        selectTipoPregunta.appendChild(optionArea);
        divPreguntas.appendChild(selectTipoPregunta);

        // Botón para añadir más preguntas
        const anadirPregunta = document.createElement('button');
        anadirPregunta.textContent = 'Añadir pregunta';
        anadirPregunta.addEventListener('click', () => {
            const tipoSeleccionado = selectTipoPregunta.value;
            const nuevaPreguntaDiv = document.createElement('div');
            nuevaPreguntaDiv.classList.add('divPregunta');

            if (tipoSeleccionado === 'texto') {
                const labelPregunta = document.createElement('label');
                labelPregunta.textContent = "Pregunta: ";
                nuevaPreguntaDiv.appendChild(labelPregunta);

                const inputTexto = document.createElement('input');
                inputTexto.setAttribute('type', 'text');
                inputTexto.setAttribute('name', 'texto');
                nuevaPreguntaDiv.appendChild(inputTexto);

                const labelRespuesta = document.createElement('label');
                labelRespuesta.textContent = "Respuesta: ";
                nuevaPreguntaDiv.appendChild(labelRespuesta);

                const inputRespuesta = document.createElement('input');
                inputRespuesta.setAttribute('type', 'text');
                inputRespuesta.setAttribute('name', 'respuesta');
                nuevaPreguntaDiv.appendChild(inputRespuesta);
            } else if (tipoSeleccionado === 'area') {
                const labelPregunta = document.createElement('label');
                labelPregunta.textContent = "Pregunta: ";
                nuevaPreguntaDiv.appendChild(labelPregunta);

                const textareaArea = document.createElement('textarea');
                textareaArea.setAttribute('name', 'area');
                nuevaPreguntaDiv.appendChild(textareaArea);

                const labelRespuesta = document.createElement('label');
                labelRespuesta.textContent = "Respuesta: ";
                nuevaPreguntaDiv.appendChild(labelRespuesta);

                const textareaRespuesta = document.createElement('textarea');
                textareaRespuesta.setAttribute('name', 'respuesta');
                nuevaPreguntaDiv.appendChild(textareaRespuesta);
            }

            // Campo para los puntos
            const labelPuntos = document.createElement('label');
            labelPuntos.textContent = "Puntos: ";
            nuevaPreguntaDiv.appendChild(labelPuntos);

            const inputPuntos = document.createElement('input');
            inputPuntos.setAttribute('type', 'number');
            inputPuntos.setAttribute('name', 'puntos');
            nuevaPreguntaDiv.appendChild(inputPuntos);

            // Botón para borrar la nueva pregunta
            const eliminarNuevaPregunta = document.createElement('button');
            eliminarNuevaPregunta.textContent = 'Borrar pregunta';
            eliminarNuevaPregunta.addEventListener('click', () => {
                divPreguntas.removeChild(nuevaPreguntaDiv);
            });
            nuevaPreguntaDiv.appendChild(eliminarNuevaPregunta);

            // Agregar la nueva pregunta al divPreguntas
            divPreguntas.appendChild(nuevaPreguntaDiv);
        });

        divEditor.appendChild(divPreguntas);
        divEditor.appendChild(anadirPregunta);
    }

    generarCamposPregunta(divPregunta, pregunta) {
        const divCampo = document.createElement('div')
        divCampo.classList.add('campo')
    
        switch (pregunta.tipo) {
            case 'textarea':
                divCampo.setAttribute('data-type', 'textarea')
    
                const labelTexto = document.createElement('label')
                labelTexto.textContent = pregunta.nombre + ":"
                divCampo.appendChild(labelTexto)
    
                const textareaTexto = document.createElement('textarea')
                textareaTexto.setAttribute('name', pregunta.nombre.toLowerCase())
                divCampo.appendChild(textareaTexto)
                break
    
            case 'numero':
                divCampo.setAttribute('data-type', 'numero')
    
                const labelPuntos = document.createElement('label')
                labelPuntos.textContent = pregunta.nombre + ":"
                divCampo.appendChild(labelPuntos)
    
                const inputNumero = document.createElement('input')
                inputNumero.setAttribute('type', 'number')
                inputNumero.setAttribute('name', pregunta.nombre.toLowerCase())
                divCampo.appendChild(inputNumero)
                break
    
            default:
                console.log("Tipo de campo no reconocido:", pregunta.tipo)
                break
        }
        divPregunta.appendChild(divCampo)
    }
}
    