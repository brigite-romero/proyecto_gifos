//Search header

const buscar = document.getElementById('searchHeader')

function activarBuscador() {
	if (document.documentElement.scrollTop > 350) {
        buscar.style.display = "flex";
    }else{
        buscar.style.display = "none";
    }
}
window.addEventListener('scroll', activarBuscador);

