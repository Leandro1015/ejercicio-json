export class Modelo {
    static obtenerJSON() {
        return {
            "campos": [
                {
                    "nombre": "Título",
                    "tipo": "texto"
                },
                {
                    "nombre": "Curso",
                    "tipo": "selección",
                    "valores": ["1DAW2", "2DAW"]
                },
                {
                    "nombre": "Modo",
                    "tipo": "opciones",
                    "valores": ["entrenamiento", "examen"]
                }
            ]
        }
    }
}