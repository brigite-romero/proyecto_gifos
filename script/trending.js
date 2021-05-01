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
  })
}

getData(path);