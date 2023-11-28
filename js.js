const linkAdd = "/@@images/image/preview"

const mostWanted = async () => {
    const url = "https://api.fbi.gov/wanted/v1/list";
    try {
        let datos = await fetch(url);
        let response = await datos.json();
        console.log(response)
        return (response.items)
    } catch (error) {
        console.log(error)
    }
}

function obtenerNumeroAlAzar(maximo) {
    let obtenerNumero = Math.random();
    let numeroAlAzar = Math.floor(obtenerNumero * (maximo));

    return numeroAlAzar;
}

function mostrarBuscado(masBuscados, indice) {
    let imagen = document.getElementById('imagen');
    imagen.src = masBuscados[indice].images[0].large
    console.log(masBuscados[indice].images)
    let textoDescripcion = document.querySelector('.card__content__box');
    let nombre = document.getElementById('nombre');
    let apodo = document.getElementById('apodo');
    let descripcion = document.getElementById('descripcion');
    nombre.textContent = masBuscados[indice].aliases ? masBuscados[indice].aliases[0] : "Unknown";
    apodo.textContent = masBuscados[indice].aliases ? masBuscados[indice].aliases[masBuscados[indice].aliases.length - 1] : "Unknown";
    descripcion.innerHTML = masBuscados[indice].details ? masBuscados[indice].details + `<br> <a href="${masBuscados[indice].url}">Page</a>`: masBuscados[indice].caution + `<br> <a href="${masBuscados[indice].url}">Page</a>`

    console.log(masBuscados[indice])
    if (textoDescripcion) {
        textoDescripcion.scrollTop = 0;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const masBuscados = await mostWanted();
    const limite = masBuscados.length
    const tarjeta = document.getElementById('card');
    mostrarBuscado(masBuscados, obtenerNumeroAlAzar(limite))
    console.log(limite)
    console.log(masBuscados.url)
    console.log("https://www.fbi.gov/wanted/human-trafficking/weili-pang/@@images/image/preview")

    let boton = document.getElementById('boton');
    boton.addEventListener('click', () => {
        mostrarBuscado(masBuscados, obtenerNumeroAlAzar(limite))
    })
    tarjeta.addEventListener('mouseleave', () => {
        let textoDescripcion = document.querySelector('.card__content__box');
        if (textoDescripcion) {
            textoDescripcion.scrollTop = 0;
        }
    })
})