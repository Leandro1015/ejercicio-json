export class Examen {
    static getCabecera() {
        return {
            "campos": [
                {
                    "nombre": "Título",
                    "tipo": "texto"
                },
                {
                    "nombre": "Curso",
                    "tipo": "selección",
                    "valores": ["1DAW", "2DAW"]
                },
                {
                    "nombre": "Modo",
                    "tipo": "opciones",
                    "valores": ["entrenamiento", "examen"]
                }
            ]
        }
    }

    static getPreguntas() {
        return ["texto", "area"]
    }

    static getPregunta(tipo) {
        switch (tipo) {
            case "texto":
                return {
                    "preguntas": [
                        {
                            "nombre": "Texto",
                            "tipo": "texto"
                        },
                        {
                            "nombre": "Respuesta",
                            "tipo": "texto"
                        },
                        {
                            "nombre": "Puntos",
                            "tipo": "numero"
                        }
                    ]
                }
            case "area":
                return {
                    "preguntas": [
                        {
                            "nombre": "Pregunta",
                            "tipo": "texto"
                        },
                        {
                            "nombre": "Respuesta",
                            "tipo": "texto"
                        },
                        {
                            "nombre": "Puntos",
                            "tipo": "numero"
                        }
                    ]
                }
            default:
                return {}
        }
    }
}
