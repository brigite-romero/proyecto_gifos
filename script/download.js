document.onclick = captura_click_down;
                    
function captura_click_down(e) {
    let idDown = e.target.id;
    let classElement = e.target.className;
    if (classElement === "checkDown"){
        downloadGif(idDown)
    }
}
async function downloadGif(gifID){
    const myGif = await fetch(`https://media.giphy.com/media/${gifID}/giphy.gif`);
    const file = await myGif.blob();
    const urlBlob = URL.createObjectURL(file);
    const $aTag = document.createElement("a");
    $aTag.download = "myGif.gif";
    $aTag.href = urlBlob;
    $aTag.click();
}