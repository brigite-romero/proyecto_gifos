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

    const bx_act = document.createElement("div");
    bx_act.className = "bx-act";
    label.appendChild(bx_act);

    const img_heart_act = document.createElement("img");
    img_heart_act.className = "img-heart-act";
    img_heart_act.src = "./assets/icon-fav-active.svg";
    img_heart_act.alt = "Heart Active";
    bx_act.appendChild(img_heart_act);

    const img_heart_hov = document.createElement("img");
    img_heart_hov.className = "img-heart-hov";
    img_heart_hov.src = "./assets/icon-fav-hover.svg";
    img_heart_hov.alt = "Heart Active";
    label.appendChild(img_heart_hov);

// Aquí termina todo eso

    const subtitle = document.createElement("h2");
    subtitle.className = "subtitle";
    hover_img.appendChild(subtitle);

    const title = document.createElement("h1");
    title.className = "title-gif";
    hover_img.appendChild(title);
  })
}

getData(path);