const fullscreenbutton = document.querySelector("#fullscreenbutton");
const fullscreenbuttonImage = fullscreenbutton.querySelector("img");
const documentElement = document.documentElement;

const audioChoicebutton = document.querySelector("#audiobutton");
const choose_audio_screen = document.querySelector(".choose_audio_screen");

function redrawScreenButton() {
    if (document.fullscreenElement === null) {
        fullscreenbuttonImage.setAttribute("src", "./img/icons/small_screen.png");
   } else {
        fullscreenbuttonImage.setAttribute("src", "./img/icons/full_screen.png");
   }
}

redrawScreenButton();

function openFullscreen() {

    if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
    } else if (documentElement.webkitRequestFullscreen) { /* Safari */
    documentElement.webkitRequestFullscreen();
    } else if (documentElement.msRequestFullscreen) { /* IE11 */
    documentElement.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
    }
}

fullscreenbutton.addEventListener("click", () => {

    if (document.fullscreenElement === null) {
        console.log(document.fullscreenElement)
        openFullscreen();
    } else {
        closeFullscreen();
    }

    redrawScreenButton();
})

let chooseScreenOpen = false;

audioChoicebutton.addEventListener("click", () => {
    
    if (chooseScreenOpen) {
        choose_audio_screen.setAttribute("hidden", true)
    } else {
        choose_audio_screen.removeAttribute("hidden", null)
    }

    chooseScreenOpen = !chooseScreenOpen

})


