//variables

const urlresultados = 'https://api.giphy.com/v1/gifs/search';
const urlsugerencias = 'https://api.giphy.com/v1/gifs/search/tags';
const api_key = 'GWh43EKcmjngwSbGuEUebGNcgiQmDelI';
let word = document.getElementById('inp-search');
let wordTwo = document.getElementById('inp-search-header');
const okBanner = document.getElementById('search');
const okHeader = document.getElementById('search-header');
const titulo = document.getElementById('titulo');
const banner = document.getElementById('cont-img');
const title = document.getElementById('title');
const resultados = document.getElementById('resultados');
const noResultados = document.getElementById('noResultados');
const vermas = document.getElementById('ver-mas');
let element =  document.getElementById('contResul');
let elementSug = document.getElementById('sugerencias');
let contResultados = document.getElementById('div-resultados');
let contSugerencias = document.getElementById('div-sugerencias');
let gif = document.getElementsByClassName('gif');
const buscar = document.getElementById('searchHeader');
const imgSugerencias = document.getElementById('img-search-active');
const closeSugerencias = document.getElementById('close-search');
const lineSugerencias = document.getElementById('line');
let limitcont = 1;

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
    const wordBanner = word.value;
    const wordHeader = wordTwo.value;
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
        word = '';
        traer(12);
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

async function traer(limit){
    limitcont += 1;
    let wordBanner = word.value;
    let wordHeader = wordTwo.value;
    let wordSugerencia = wordthree;
    if (limit === 12){
        contResultados.removeChild(element);
        element = document.createElement("div");
        element.className = "resultadosObtenidos";
        element.id = "contResult"
        contResultados.appendChild(element);
    }
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
            for (i = limit-12; i < limit; i++){
                let gifs = data.data[i].images.original.url;
                let gif_id = data.data[i].id
                let tarGif = document.createElement("div");
                tarGif.id = "gif";
                tarGif.className = "gif";
                element.appendChild(tarGif);
                tarGif.innerHTML = `<img class="img-gif" src="${gifs}">`;
                noResultados.style.display = "none";
                vermas.style.display = "flex";
                titulo.innerHTML = `<div class="line"></div>
                <p class="titulo" id="title_resul">${wordBanner || wordHeader || wordSugerencia}</p>`

                const hover_img = document.createElement("div");
                hover_img.className = "hover-img";
                hover_img.id = "hover-img";
                tarGif.appendChild(hover_img);

            // Aquí comienza la parte de lo del corazón, descarga y hacerle zoom/click

                const content_fav = document.createElement("div");
                content_fav.className = "content-fav";
                hover_img.appendChild(content_fav);

                const heart_box = document.createElement("div");
                heart_box.className = "heart-box";
                content_fav.appendChild(heart_box);

                const label = document.createElement("label");
                heart_box.appendChild(label);

                const check = document.createElement("input");
                check.type = "checkbox";
                check.id = "check";
                check.value = "heart_1";
                label.appendChild(check);

                const img_heart = document.createElement("img");
                img_heart.className = "img-heart";
                img_heart.src = "./assets/icon-fav.svg";
                img_heart.alt = "Heart";
                label.appendChild(img_heart);

                const img_heart_hov = document.createElement("img");
                img_heart_hov.className = "img-heart-hov";
                img_heart_hov.src = "./assets/icon-fav-hover.svg";
                img_heart_hov.alt = "Heart hover";
                label.appendChild(img_heart_hov);

                // Aquí empieza la parte de download

                const down_box = document.createElement("div");
                down_box.className = "down-box";
                down_box.id = "down_gif";
                content_fav.appendChild(down_box);

                const label_down = document.createElement("label");
                down_box.appendChild(label_down);

                const check_down = document.createElement("input");
                check_down.type = "checkbox";
                check_down.id = `${gif_id}`;
                check_down.className ="checkDown";
                check_down.value = "down_1";
                label_down.appendChild(check_down);

                const img_down = document.createElement("img");
                img_down.className = "img-down";
                img_down.src = "./assets/icon-download.svg";
                img_down.alt = "Download";
                label_down.appendChild(img_down);

                const img_down_hov = document.createElement("img");
                img_down_hov.className = "img-down-hov";
                img_down_hov.src = "./assets/icon-download-hover.svg";
                img_down_hov.alt = "Download hover";
                label_down.appendChild(img_down_hov);

                // Aquí termina la parte de download

                // Parte hacerle zoom

                const zoom_box = document.createElement("div");
                zoom_box.className = "zoom-box";
                content_fav.appendChild(zoom_box);

                const label_zoom = document.createElement("label");
                zoom_box.appendChild(label_zoom);

                const check_zoom = document.createElement("input");
                check_zoom.type = "checkbox";
                check_zoom.id = "checkZoom";
                check_zoom.value = "zoom_1";
                label_zoom.appendChild(check_zoom);

                const img_zoom = document.createElement("img");
                img_zoom.className = "img-zoom";
                img_zoom.src = "./assets/icon-max-normal.svg";
                img_zoom.alt = "Max";
                label_zoom.appendChild(img_zoom);

                const img_zoom_hov = document.createElement("img");
                img_zoom_hov.className = "img-zoom-hov";
                img_zoom_hov.src = "./assets/icon-max-hover.svg";
                img_zoom_hov.alt = "Zoom hover";
                label_zoom.appendChild(img_zoom_hov);

                // Finaliza parte hacerle zoom

            // Aquí termina todo eso

                let user = data.data[i].username;
                if (user == ""){
                user = "Anónimo"
                }

                let title_name = data.data[i].title;

                const subtitle = document.createElement("h2");
                subtitle.className = "subtitle";
                subtitle.innerHTML = user
                hover_img.appendChild(subtitle);

                const title = document.createElement("h1");
                title.className = "title-gif";
                title.innerHTML = title_name
                hover_img.appendChild(title);
                            }
                        }
                    });
                }  

okBanner.addEventListener('click',()=>traer(12));
okHeader.addEventListener('click',()=>traer(12));
vermas.addEventListener('click',()=>traer(limitcont * 12));
