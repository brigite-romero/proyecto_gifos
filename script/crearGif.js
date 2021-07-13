const apiKey = 'n8KtgV7bEMIp74WJ2vJjRcoZXAvQiPX5';

const btnBegin = document.getElementsByClassName('begin');
let recorder = document.getElementsByClassName('recorder');
let finish = document.getElementsByClassName('finish');
let upload = document.getElementsByClassName('upload');
let act_step = document.querySelectorAll('.step');
let time = document.getElementsByClassName('time');
let replay = document.getElementById('replay');
let video_over = document.getElementsByClassName('video-over');
let icon_loading = document.getElementById('icon-loading');
let load_para = document.getElementById('load-para');
let shares = document.getElementById('shares');
let actions = document.getElementById('shares');
let recording;
let blob;
let date;
let form = new FormData();
let list_gifos = [];
let gifos_as_txt = localStorage.getItem('mis_gifos');
let video_v = document.getElementsByClassName('video-v');
let gif = document.getElementsByClassName('gif');

function starting() {
  btnBegin.style.display = "none";
  let title = document.getElementsByClassName('title');
  let paragraph = document.getElementsByClassName('paragraph');
  title.innerHTML = "¿Nos das acceso </br>a tu cámara?";
  paragraph.innerHTML = "El acceso a tu cámara será válido sólo </br>por el tiempo en el que estés creando el GIFO."
  act_step[0].classList.add('act-step');
  navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 320 } })
    .then(function (mediaStream) {
      title.style.display = "none";
      paragraph.style.display = "none";
      recorder.style.display = "block";
      act_step[0].classList.remove('act-step');
      act_step[1].classList.add('act-step');
      video_v.style.display = "block";
      video_v.srcObject = mediaStream;
      video_v.onloadedmetadata = function (e) {
        video_v.play();
      };
      recording = RecordRTC(mediaStream, {
        type: 'gif'
      });
    })
}


function making() {
  recording.startRecording();
  console.log("grabando");
  recorder.style.display = "none";
  finish.style.display = "block";
  time.style.display = "block";
  replay.style.display = "none";
  date = new Date().getTime();
  (function loop() {
    if (!recording) {
      return;
    }
    time.innerHTML = timer((new Date().getTime() - date) / 1000);
    setTimeout(loop, 1000);
  })();
}


function finishing() {
  console.log("terminado");
  finish.style.display = "none";
  upload.style.display = "block";
  time.style.display = "none";
  replay.style.display = "block";
  recording.stopRecording(function () {
    video_v.style.display = "none";
    gif.style.display = "block";
    blob = recording.getBlob();
    gif.src = URL.createObjectURL(recording.getBlob());
    form.append('file', recording.getBlob(), 'myGif.gif');
    form.append('api_key', apiKey);
  });
}



function uploading() {
  video_over.style.display = "flex";
  upload.style.display = "none";
  act_step[1].classList.remove('act-step');
  act_step[2].classList.add('act-step');
  replay.style.display = "none";
  fetch(`https://upload.giphy.com/v1/gifs`, {
    method: 'POST',
    body: form,
  })
    .then(response => {
      return response.json();
    })
    .then(object => {
      console.log(object);
      let id_gif = object.data.id;
      shares.style.display = "block";
      icon_loading.setAttribute('src', './assets/check.svg');
      load_para.innerHTML = "GIFO subido con éxito";
      actions.innerHTML = `
        <button class="btn-video-js" id="download" onclick="download_gif('${id_gif}')">
        <img src="./assets/icon-download.svg" alt="Descargar gif">
        </button>
        <button class="btn-video-js" id="link">
        <img src="./assets/icon-link.svg" alt="Link gif">
        </button>
        `;
      if (gifos_as_txt == null) {
        list_gifos = [];
      } else {
        list_gifos = JSON.parse(gifos_as_txt)
      }
      list_gifos.push(id_gif);
      gifos_as_txt = JSON.stringify(list_gifos);
      localStorage.setItem("mis_gifos", gifos_as_txt);
    })
    .catch( error => console.log("Error al intentar subir gif" + error))
}

async function download_gif(gifymg) {
  let blob = await fetch(gifymg).then(img => img.blob());
  invokeSaveAsDialog(blob, "myGifo.gif");
}


function replaying() {
  recording.clearRecordedData();
  console.log("Repitiendo captura de gif");
  replay.style.display = "none";
  upload.style.display = "none";
  gif.style.display = "none";
  recorder.style.display = "block";
  navigator.mediaDevices.getUserMedia( { audio: false, video: {width: 480, height: 320} } )
    .then(function (mediaStream) {
      video_v.style.display = "block";
      video_v.srcObject = mediaStream;
      video_v.onloadedmetadata = function (e) {
        video_v.play();
      };
      recording = RecordRTC(mediaStream, {
        type: 'gif'
      });
    })
}


function timer(ss) {
  let hour = Math.floor(ss/3600);
  let minutes = Math.floor((ss - (hour * 3600))/60);
  let seconds = Math.floor(ss - (hour * 3600) - (minutes * 60));
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hour + ':' + minutes + ':' + seconds;
}

replay.addEventListener('click', replaying);
btnBegin.addEventListener('click', starting);
recorder.addEventListener('click', making);
finish.addEventListener('click', finishing);
upload.addEventListener('click', uploading);