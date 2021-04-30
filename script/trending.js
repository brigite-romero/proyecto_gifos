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
const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=15`;
