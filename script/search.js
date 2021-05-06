//variables

const url = 'https://api.giphy.com/v1/gifs/search';
let api_key = 'GWh43EKcmjngwSbGuEUebGNcgiQmDelI';
let word = document.getElementById('inp-search');
let wordTwo = document.getElementById('inp-search-header');
let okBanner = document.getElementById('search');
let okHeader = document.getElementById('search-header');
let titulo = document.getElementById('titulo');
let banner = document.getElementById('cont-img');
let title = document.getElementById('title');
let resultados = document.getElementById('resultados');
let noResultados = document.getElementById('noResultados');
let vermas = document.getElementById('ver-mas');
let element =  document.getElementById('contResul');
let contResultados = document.getElementById('div-resultados');
let maxLimit = 48;
let gif = document.getElementsByClassName('gif');
const buscar = document.getElementById('searchHeader')

//Search header

function activarBuscador() {
	if (document.documentElement.scrollTop > 350) {
        buscar.style.display = "flex";
    }else{
        buscar.style.display = "none";
    }
}
window.addEventListener('scroll', activarBuscador);

//resultados de busqueda

async function traer(){
    let wordBanner = word.value;
    let wordHeader = wordTwo.value;
    contResultados.removeChild(element);
    element = document.createElement("div");
    element.className = "resultadosObtenidos";
    element.id = "contResult"
    contResultados.appendChild(element);
    banner.style.display = "none";
    title.style.display = "none";
    resultados.style.display = "flex";
    await fetch(`${url}?q=${wordBanner || wordHeader }&api_key=${api_key}&limit=${maxLimit}`)
    .then(response => response.json())
    .then(data => {
        if(data.data == ''){
            noResultados.style.display = "flex";
            vermas.style.display = "none";
            titulo.innerHTML = `<div class="line"></div>
            <p class="titulo">Lorem Ipsum</p>`
        }else{
            for (i = 0; i < 12; i++){
                let gifs = data.data[i].images.original.url;
                let tarGif = document.createElement("div");
                tarGif.id = "gif";
                tarGif.className = "gif";
                element.appendChild(tarGif);
                tarGif.innerHTML = `<img class="img-gif" src="${gifs}">`;
                noResultados.style.display = "none";
                vermas.style.display = "flex";
                titulo.innerHTML = `<div class="line"></div>
                <p class="titulo">${wordBanner || wordHeader}</p>`
            }
        }
    });
}  

okBanner.addEventListener('click',traer);
okHeader.addEventListener('click',traer);
