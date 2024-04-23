export class Modelo {
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
    static getPregunta(tipo) {
        switch (tipo) {
            case "area":
                return {
                    "preguntas": [
                        {
                            "nombre": "Texto",
                            "tipo": "textarea"
                        },
                        {
                            "nombre": "Respuesta",
                            "tipo": "textarea2"
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