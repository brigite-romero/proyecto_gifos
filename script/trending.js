const $sliderContainer = document.querySelector(".slider__container");

const API_KEY = "n8KtgV7bEMIp74WJ2vJjRcoZXAvQiPX5";
const MAXIMUM_GIFS = 20;
const TRENDINGS_ENDPOINT = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${MAXIMUM_GIFS}`;

const favoritesArray = [];

const addToTheFavoritesSection = () => {
  if (localStorage.getItem("someFavorites")) {
    const alreadySavedItems = JSON.parse(localStorage.getItem("someFavorites"));
    favoritesArray.push(...alreadySavedItems);
  }
  const itemsMap2 = favoritesArray.map((item) => [item.id, item]);
  const itemsMapArr2 = new Map(itemsMap2);

  const uniques = [...itemsMapArr2.values()];
  localStorage.setItem("someFavorites", JSON.stringify(uniques));
};

const $header = document.querySelector("#header");
$header.addEventListener("click", addToTheFavoritesSection);

async function getTrendings(url) {
  const resp = await fetch(url);
  const json = await resp.json();

  json.data.forEach((element) => {
    const $sliderItem = document.createElement("div");
    $sliderItem.className = "slider__item";
    $sliderContainer.appendChild($sliderItem);

    const $gif = document.createElement("img");
    $gif.className = "slider__img";
    $gif.src = element.images.original.url;
    $gif.alt = element.title;
    $sliderItem.appendChild($gif);

    const $sliderHover = document.createElement("div");
    $sliderHover.className = "slider__hover";
    $sliderItem.appendChild($sliderHover);

    const $sliderIcons = document.createElement("div");
    $sliderIcons.className = "slider__icons";
    $sliderItem.appendChild($sliderIcons);

    const $firstIconContainer = document.createElement("div");
    $firstIconContainer.className = "slider__icon-container";
    $sliderIcons.appendChild($firstIconContainer);
    const $firstIcon = document.createElement("span");
    $firstIcon.className = "slider__icon--first";
    $firstIconContainer.appendChild($firstIcon);

    const $secondIconContainer = document.createElement("div");
    $secondIconContainer.className = "slider__icon-container";
    $sliderIcons.appendChild($secondIconContainer);
    const $secondIcon = document.createElement("span");
    $secondIcon.className = "slider__icon--second";
    $secondIconContainer.appendChild($secondIcon);

    const downloadGif = async () => {
      const myGif = await fetch(`https://media.giphy.com/media/${element.id}/giphy.gif`);
      const file = await myGif.blob();
      const urlBlob = URL.createObjectURL(file);
      const $aTag = document.createElement("a");
      $aTag.download = `${element.title}.gif`;
      $aTag.href = urlBlob;
      $aTag.click();
    };

    $secondIconContainer.addEventListener("click", () => {
      downloadGif();
    });

    const $lastIconContainer = document.createElement("div");
    $lastIconContainer.className = "slider__icon-container";
    $sliderIcons.appendChild($lastIconContainer);
    const $lastIcon = document.createElement("span");
    $lastIcon.className = "slider__icon--last";
    $lastIconContainer.appendChild($lastIcon);

    const $sliderText = document.createElement("div");
    $sliderText.className = "slider__text";
    $sliderItem.appendChild($sliderText);

    const $sliderParagraph = document.createElement("p");
    $sliderParagraph.className = "slider__p";
    if (element.username === "") {
      $sliderParagraph.textContent = "Desconocido";
    } else {
      $sliderParagraph.textContent = element.username;
    }
    $sliderText.appendChild($sliderParagraph);

    const $sliderTitle = document.createElement("p");
    $sliderTitle.className = "slider__title";
    $sliderTitle.textContent = element.title;
    $sliderText.appendChild($sliderTitle);

    function openFullscreen() {
      if ($sliderItem.requestFullscreen) {
        $sliderItem.requestFullscreen();
      } else if ($sliderItem.webkitRequestFullscreen) {
        $sliderItem.webkitRequestFullscreen();
      } else if ($sliderItem.msRequestFullscreen) {
        $sliderItem.msRequestFullscreen();
      }
    }

    function closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    const makeAGifFullScreen = () => {
      $sliderItem.id = "mainDiv";
      $gif.id = "theGif--";
      $sliderHover.id = "theHoverDiv--";
      $sliderIcons.id = "sliderICons--";
      $firstIconContainer.id = "iconsContainers1--";
      $secondIconContainer.id = "iconsContainers2--";
      $lastIconContainer.id = "iconsContainers3--";
      $firstIcon.id = "firstIcon--";
      $secondIcon.id = "secondIcon--";
      $lastIcon.id = "lastIcon--";
      $sliderText.id = "textContainer--";
      $sliderParagraph.id = "textUser--";
      $sliderTitle.id = "textTitle--";

      openFullscreen();

      $lastIconContainer.removeEventListener("click", makeAGifFullScreen);

      $lastIconContainer.addEventListener("click", whenCloseFullScreen);
    };

    const whenCloseFullScreen = () => {
      $sliderItem.removeAttribute("id");
      $gif.removeAttribute("id");
      $sliderHover.removeAttribute("id");
      $sliderIcons.removeAttribute("id");
      $firstIconContainer.removeAttribute("id");
      $secondIconContainer.removeAttribute("id");
      $lastIconContainer.removeAttribute("id");
      $firstIcon.removeAttribute("id");
      $secondIcon.removeAttribute("id");
      $lastIcon.removeAttribute("id");
      $sliderText.removeAttribute("id");
      $sliderParagraph.removeAttribute("id");
      $sliderTitle.removeAttribute("id");

      closeFullscreen();

      $lastIconContainer.removeEventListener("click", whenCloseFullScreen);

      $lastIconContainer.addEventListener("click", makeAGifFullScreen);
    };

    $lastIconContainer.addEventListener("click", makeAGifFullScreen);

    const addToFavorites = () => {
      $firstIcon.style = `background-image: url("./assets/icon-heart-full.svg");`;

      favoritesArray.push(element);

      $firstIconContainer.removeEventListener("click", addToFavorites);
      $firstIconContainer.addEventListener("click", removeFromFavorites);
    };

    const removeFromFavorites = () => {
      $firstIcon.style = `background-image: url("./assets/icon-heart.svg");`;

      if (favoritesArray.includes(element)) {
        favoritesArray.pop(element);
      }

      $firstIconContainer.removeEventListener("click", removeFromFavorites);
      $firstIconContainer.addEventListener("click", addToFavorites);
    };

    $firstIconContainer.addEventListener("click", addToFavorites);
  });
}

getTrendings(TRENDINGS_ENDPOINT);

// Slider

const $leftArrow = document.querySelector(".slider__arrow");
const $rightArrow = document.querySelectorAll(".slider__arrow")[1];

$leftArrow.addEventListener("click", () => {
  $sliderContainer.scrollLeft -= 400;
});


$rightArrow.addEventListener("click", () => {
  $sliderContainer.scrollLeft += 400;
});
=======
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
