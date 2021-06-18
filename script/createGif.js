const gifs_gallery = [];

const save = () => {
  if (localStorage.getItem("my_Gifs")) {
    const saved_elements = JSON.parse(localStorage.getItem("my_Gifs"));
    gifs_gallery.push(...saved_elements);
  }
  const elements_map = gifs_gallery.map((item) => [item.id, item]);
  const e_map_new = new Map(elements_map);
  const single = [...e_map_new.values()];

  localStorage.setItem("my_Gifs", JSON.stringify(single));
};

const header = document.querySelector(".header");
header.addEventListener("click", save);

let stopwatch;
let milliseconds = 0;
const timer_watch = document.createElement("div");

function onset_time() {
  clearInterval(stopwatch);
  stopwatch = setInterval(() => {
    milliseconds += 10;
    const timer = new Date(milliseconds);
    timer_watch.innerHTML = `${`0${timer.getUTCMinutes()}`.slice(-2)}:${`0${timer.getUTCSeconds()}`.slice(-2)}:${`0${timer.getUTCMilliseconds()}`.slice(-3, -1)}`;
  }, 10);
}
function break_time() {
  clearInterval(stopwatch);
}

let camcorder;
const button = document.querySelector("#button");
const title = document.querySelector(".title");
const paragraph = document.querySelector(".parrafo");
const paso_one = document.querySelector(".paso");

const begin_recording = () => {
  record((stream) => {
    camcorder = RecordRTC(stream, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted() {
        console.log("began");
      }
    });
  });
  button.style = "display: none;";
  title.innerHTML = "¿Nos das acceso <br /> a tu cámara?";
  paragraph.innerHTML = "El acceso a tu cámara será válido sólo <br /> por el tiempo en el que estés creando el GIFO.";
  paso_one.className = "paso_present";
};

const creargifos = document.querySelector(".creargifos");
const video_content = document.createElement("div");
const record_video = document.createElement("video");
const paso_two = document.querySelectorAll(".paso")[1];

const record = (callback) => {
  navigator.mediaDevices
    .getUserMedia({video: true})
    .then((stream) => {
      callback(stream);
      creargifos.appendChild(video_content);
      video_content.appendChild(record_video);
      video_content.className = "video_content";
      record_video.srcObject = stream;
      record_video.autoplay = "true";
      record_video.className = "record_video";
      paso_one.className = "paso";
      paso_two.className = "paso_present"
      button.removeEventListener("click", begin_recording);
      button.style = "display: block;";
      button.textContent = "grabar";
      button.addEventListener("click", begin_recording_two);
    })
    .catch(() => {
      alert("Necesitas dar acceso a la cámara para poder realizar tu Gifo.");
    });
};

const begin_recording_two = () => {
  creargifos.appendChild(timer_watch);
  timer_watch.textContent = "00:00:00";
  timer_watch.className = "timer_watch";
  onset_time();
  button.textContent = "Finalizar";
  camcorder.startRecording();
  button.removeEventListener("click", begin_recording_two);
  button.addEventListener("click", begin_recording_three);
};

let formal = new FormData();

const begin_recording_three = () => {
  button.textContent = "Subir Gifo";
  timer_watch.textContent = "Repetir captura";
  timer_watch.style = "border-bottom: 4px #50E3C2 solid; font-size: 20.8px; cursor: pointer;";
  break_time();
  button.removeEventListener("click", begin_recording_three);
  button.addEventListener("click", begin_recording_four);
  camcorder.stopRecording(() => {
    formal.append("file", camcorder.getBlob(), "myGifo.gif");
    console.log(formal.get("file"));
  });

  const video_loop = () => {
    timer_watch.textContent = "00:00:00";
    timer_watch.style = "";
    break_time();
    milliseconds = 0;
    stopwatch = 0;
    button.removeEventListener("click", begin_recording_four);
    timer_watch.removeEventListener("click", video_loop);
    formal = new FormData();
    begin_recording();
  };
  timer_watch.addEventListener("click", video_loop);
};

const apiKey = 'n8KtgV7bEMIp74WJ2vJjRcoZXAvQiPX5';
let id_gifo;

async function data() {
  try {
    const response = await fetch("https://upload.giphy.com/v1/gifs?api_key=n8KtgV7bEMIp74WJ2vJjRcoZXAvQiPX5", {
      method: "post",
      body: formal,
      redirect: "follow",
    });
    const Json = await response.json();
    id_gifo = Json.data.id;
  } catch (error) {
    console.log(error);
  };
};

async function download_gifo() {
  try {
    const response_two = await fetch(`https://api.giphy.com/v1/gifs/${id_gifo}?api_key=${apiKey}`);
    const my_Json = await response_two.json();
    const my_gifo_d = my_Json.data;
    gifs_gallery.push(my_gifo_d);
    loading.src = "/assets/check.svg";
    content_video_text.textContent = "GIFO subido con éxito";

    const cont_items = document.createElement("div");
    const down_cont = document.createElement("div");
    const down = document.createElement("img");
    const link_cont = document.createElement("div");
    const link = document.createElement("img");
    cont_items.className = "cont_items";
    down_cont.className = "down_cont";
    link_cont.className = "link_cont";
    video_text.appendChild(cont_items);
    cont_items.append(down_cont, link_cont);
    down.src = "https://svgur.com/i/WGB.svg";
    link.src = "https://svgur.com/i/WEz.svg";
    down_cont.appendChild(down);
    link_cont.appendChild(link);

    link_cont.addEventListener("click", () => {
      link_cont.style = "opacity: 1;";
      const texto = `https://giphy.com/gifs/${id_gifo}`;
      const brdr = document.createElement("textarea");
      brdr.value = texto;
      brdr.setAttribute("readonly", "");
      brdr.style.position = "absolute";
      brdr.style.left = "-9999px";
      document.body.appendChild(brdr);
      brdr.select();
      document.execCommand("copy");
      document.body.removeChild(brdr);
      console.log("The URL has already been copied to the clipboard.");
    });

    const download = async () => {
      const my_gif = await fetch(`https://media.giphy.com/media/${id_gifo}/giphy.gif`);
      const archive = await my_gif.blob();
      const url = URL.createObjectURL(archive);
      const label = document.createElement("a");
      label.download = "myGif.gif";
      label.href = url;
      label.click();
    };
    down_cont.addEventListener("click", () => {
      link_cont.style = "opacity: 1;";
      download();
    });
  } catch (error) {
    console.log(error);
  };
};

const paso_three = document.querySelectorAll(".paso")[2];
const video_text = document.createElement("div");
const content_video_text = document.createElement("p");
const purple_color = document.createElement("div");
const loading = document.createElement("img");

const begin_recording_four = async () => {
  paso_three.className = "paso_present";
  paso_two.className = "paso";
  video_content.appendChild(video_text);
  video_content.appendChild(purple_color);
  purple_color.style = "opacity: 0.6; background: rgb(87, 46, 229); position: absolute; z-index: 99999; width: 428px; top: 0; left: 26px; height: 100%;";
  loading.style = "width: 22px; height: 22px; z-index: 999999; position: absolute; left: calc(50% - 15px);";
  loading.src = "./assets/loader.svg";
  video_text.appendChild(loading);
  button.style = "display: none;";
  timer_watch.style = "display: none;";
  content_video_text.style = "font-size: 15px; color: #FFFFFF; z-index: 999999; position: absolute; left: calc(50% - 85px); bottom: calc(50% - 40px);";
  content_video_text.textContent = "Estamos subiendo tu GIFO";
  video_text.appendChild(content_video_text);
  title.style = "opacity: 0;";
  paragraph.style = "opacity: 0;";
  button.removeEventListener("click", begin_recording_four);
  await postData();
  getMyGif();
};

button.addEventListener("click", begin_recording);