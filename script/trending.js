//trending

const fila = document.querySelector('.content-car');
const gifs = document.querySelectorAll('.gif');

const flechaIzquierda = document.getElementById('left-arrow');
const flechaDerecha = document.getElementById('right-arrow');

flechaDerecha.addEventListener('click', () => {
  fila.scrollLeft += fila.offsetWidth;
});

flechaIzquierda.addEventListener('click', () => {
  fila.scrollLeft -= fila.offsetWidth;
});

// gifs de giphy
let number = -1

const apiKey = 'n8KtgV7bEMIp74WJ2vJjRcoZXAvQiPX5';
const limit = 20;
const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`;
const carousel = document.querySelector(".carousel")

async function getData (url) {
  const response = await fetch(url);
  const json = await response.json();

  json.data.forEach((item)=>{
    const gif_container = document.createElement("div");
    gif_container.className = "gif";
    carousel.appendChild(gif_container);

    const link = document.createElement("a");
    link.className = "gifi-link";
    gif_container.appendChild(link);

    const img = document.createElement("img");
    img.className = "gifi";
    img.src = item.images.original.url;
    img.alt = item.title;
    link.appendChild(img);

    const hover_img = document.createElement("div");
    hover_img.className = "hover-img";
    hover_img.id = "hover-img";
    link.appendChild(hover_img);

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
    down_box.id = "down_gif"
    content_fav.appendChild(down_box);

    const label_down = document.createElement("label");
    down_box.appendChild(label_down);

    let gif_id = item.id
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

    let user = item.username;
    if (user == ""){
      user = "Anónimo"
    }

    let title_name = item.title;

    const subtitle = document.createElement("h2");
    subtitle.className = "subtitle";
    subtitle.innerHTML = user
    hover_img.appendChild(subtitle);

    const title = document.createElement("h1");
    title.className = "title-gif";
    title.innerHTML = title_name
    hover_img.appendChild(title);

    });
}
getData(path);