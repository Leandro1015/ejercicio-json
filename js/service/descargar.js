export class Descargar {
    static download(nombreFichero, texto) {
        const a = document.createElement('a')
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto))
        a.setAttribute('download', nombreFichero)
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
}