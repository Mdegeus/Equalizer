import {defaultExport as songs} from './js/songs.js'

const choose_audio_container = document.querySelector(".choose_audio_container");

const equalizer = document.querySelector("#equalizer");
const bars = [];
let usedBars = [];

let amount = 100;


for (let i = 0; i < amount; i++) {
    const div = document.createElement("div");
    equalizer.appendChild(div);
    div.classList.add("equalizer_component");
    bars.push(div);
}

function SetAmountBars() {
    const width = equalizer.offsetWidth
    let targetAmount = (width / 20)// 18px total used space per bar width
    targetAmount -= targetAmount % 2

    usedBars = [];

    for (let i = 0; i < bars.length; i++) {
        if (i > targetAmount) {
            bars[i].setAttribute("remove", "true")
        } else {
            bars[i].removeAttribute("remove")
            usedBars.push(bars[i]);
        }
    }
}

SetAmountBars()

window.addEventListener("resize", SetAmountBars)

const audio = new Audio();

const songtitlecontainer = document.querySelector(".songtitlecontainer");
const playbutton = document.querySelector("#playbutton");

const context = new AudioContext();
const analyser = context.createAnalyser();
const source = context.createMediaElementSource(audio);

const fbc_array = new Uint8Array(analyser.frequencyBinCount);

window.addEventListener("load", () => {
    source.connect(analyser);
    analyser.connect(context.destination);

    loop();
});

function loop() {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(fbc_array);

    let loops = 0;

    const height = equalizer.innerHeight; // .8 means 80% of the full height of the window.

    usedBars.forEach(element => {

        const thisHeight = fbc_array[loops+=1] * 1;

        element.style.height = thisHeight+"px";

        if (thisHeight < 6) {
            element.style.opacity = 0;
        } else {
            element.style.opacity = 1;
        }

    });
}

function setAudio(path, title) {

    const wasPlaying = !audio.paused;

    audio.src = path;

    songtitlecontainer.textContent = title || "Unknown";

    if (wasPlaying) {
        audio.play();
    }
}

setAudio(songs[0].path, songs[0].title)

function alterAudio() {
    const buttonImage = playbutton.querySelector("img");

    if (audio.paused) {
        audio.play();
        buttonImage.setAttribute("src", "./img/icons/pause.png");
    } else {
        audio.pause();
        buttonImage.setAttribute("src", "./img/icons/play.png");
    }
}

playbutton.addEventListener("click", alterAudio)

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
      alterAudio();
    }
  }

let firstClick;
let firstScroll;

firstClick = document.body.addEventListener("click", () => {
    context.resume();
})

firstScroll = window.addEventListener("scroll", () => {
    context.resume();
})

songs.forEach(song => {
    const div = document.createElement("button");
    const title = document.createElement("p");

    div.classList.add("song_card");

    choose_audio_container.appendChild(div);
    div.appendChild(title);

    title.textContent = song.title;

    div.addEventListener("click", () => {
        console.log(song.path)
        setAudio(song.path, song.title);
    })
});