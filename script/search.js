//variables

const urlresultados = 'https://api.giphy.com/v1/gifs/search';
const urlsugerencias = 'https://api.giphy.com/v1/gifs/search/tags';
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
let elementSug = document.getElementById('sugerencias');
let contResultados = document.getElementById('div-resultados');
let contSugerencias = document.getElementById('div-sugerencias');
let gif = document.getElementsByClassName('gif');
const buscar = document.getElementById('searchHeader');
let imgSugerencias = document.getElementById('img-search-active');
let closeSugerencias = document.getElementById('close-search');
let lineSugerencias = document.getElementById('line');

//Search header

function activarBuscador() {
	if (document.documentElement.scrollTop > 350) {
        buscar.style.display = "flex";
    }else{
        buscar.style.display = "none";
    }
}
window.addEventListener('scroll', activarBuscador);

//sugerencia de busquedas

async function sugerencias(){
    let wordBanner = word.value;
    let wordHeader = wordTwo.value;
    contSugerencias.removeChild(elementSug);
    elementSug = document.createElement("div");
    elementSug.className = "sugerencias";
    element.id = "sugerencias"
    contSugerencias.appendChild(elementSug);
    await fetch(`${urlsugerencias}?q=${wordBanner || wordHeader }&api_key=${api_key}&limit=5`)
    .then(response => response.json())
    .then(data => {
        for (i = 0; i < 4; i++){
            let resultados = data.data[i].name;
            let sugerencia = document.createElement("div");
            sugerencia.id = `sugerencia`;
            sugerencia.className = "sugerencia";
            elementSug.appendChild(sugerencia);
            sugerencia.innerHTML = `<img class="img" src="./assets/icon-search-gray.svg" alt="search">
                                    <p class="text" id="resultadoSugerencia${i}">${resultados}</p>`;
            okBanner.style.display = "none";
            imgSugerencias.style.display = "block";
            word.style.padding = "0 0 0 13px";
            closeSugerencias.style.display = "block";
            lineSugerencias.style.display = "block";
            elementSug.style.display = "block";
        }
    });
}  

word.addEventListener('keyup', sugerencias);

//buscar sugerencia
let wordthree = '';
document.onclick = captura_click;
	
function captura_click(e) {
	let idElement = e.target.id;
    let classElement = e.target.className;
    if (classElement === "text"){
        let mostrar = document.getElementById(`${idElement}`)
        wordthree = mostrar.innerHTML;
        console.log(wordthree)
        word = '';
        traer();
    }
}

//Cerrar sugerencias

function close(){
    word = document.getElementById('inp-search');
    okBanner.style.display = "block";
    imgSugerencias.style.display = "none";
    word.style.padding = "0 0 0 50px";
    closeSugerencias.style.display = "none";
    lineSugerencias.style.display = "none";
    elementSug.style.display = "none"
}

closeSugerencias.addEventListener('click', close);

//resultados de busqueda

async function traer(){
    let wordBanner = word.value;
    let wordHeader = wordTwo.value;
    let wordSugerencia = wordthree;
    contResultados.removeChild(element);
    element = document.createElement("div");
    element.className = "resultadosObtenidos";
    element.id = "contResult"
    contResultados.appendChild(element);
    banner.style.display = "none";
    title.style.display = "none";
    resultados.style.display = "flex";
    await fetch(`${urlresultados}?q=${wordBanner || wordHeader || wordSugerencia}&api_key=${api_key}&limit=48`)
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
                <p class="titulo">${wordBanner || wordHeader || wordSugerencia}</p>`
            }
        }
    });
}  

okBanner.addEventListener('click',traer);
okHeader.addEventListener('click',traer);