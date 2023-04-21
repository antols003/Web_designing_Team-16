let nplay = document.querySelector('.now-playing');
let ta = document.querySelector('.track-art');
let tname = document.querySelector('.track-name');
let tartist = document.querySelector('.track-artist');

let plpa = document.querySelector('.playpause-track');
let nebt = document.querySelector('.next-track');
let prbt = document.querySelector('.prev-track');

let sesl = document.querySelector('.seek_slider');
let vosl = document.querySelector('.vosl');

let cuti = document.querySelector('.cuti');
let todu = document.querySelector('.todu');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let cutr = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


const muli = [
    {
        img : 'images/rectangle_10.png',
        name : 'Nee kavithaigala',
        artist : 'Pradeep kumar',
        music : 'music/Nee-Kavithaigala.mp3'
    },
    {
        img : 'images/dandelions.png',
        name : 'Dandelions',
        artist : 'Ruth B',
        music : 'music/dandelions.mp3'
    },
    {
        img : 'images/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Faded.mp3'
    },
    {
        img : 'images/loki.png',
        name : 'Lokiverse',
        artist : 'Anirudh',
        music : 'music/loki.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    cutr.src = muli[track_index].music;
    cutr.load();

    ta.style.backgroundImage = "url(" + muli[track_index].img + ")";
    tname.textContent = muli[track_index].name;
    tartist.textContent = muli[track_index].artist;
    nplay.textContent = "Playing music " + (track_index + 1) + " of " + muli.length;

    updateTimer = setInterval(setUpdate, 1000);

    cutr.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    cuti.textContent = "00:00";
    todu.textContent = "00:00";
    sesl.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    cutr.play();
    isPlaying = true;
    ta.classList.add('rotate');
    wave.classList.add('loader');
    plpa.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    cutr.pause();
    isPlaying = false;
    ta.classList.remove('rotate');
    wave.classList.remove('loader');
    plpa.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < muli.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < muli.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * muli.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = muli.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = cutr.duration * (sesl.value / 100);
    cutr.currentTime = seekto;
}
function setVolume(){
    cutr.volume = vosl.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(cutr.duration)){
        seekPosition = cutr.currentTime * (100 / cutr.duration);
        sesl.value = seekPosition;

        let currentMinutes = Math.floor(cutr.currentTime / 60);
        let currentSeconds = Math.floor(cutr.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(cutr.duration / 60);
        let durationSeconds = Math.floor(cutr.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        cuti.textContent = currentMinutes + ":" + currentSeconds;
        todu.textContent = durationMinutes + ":" + durationSeconds;
    }
}



// 
// $( ".change" ).on("click", function() {
//     if( $( "body" ).hasClass( "dark" )) {
//         $( "body" ).removeClass( "dark" );
//         $( ".change" ).text( "OFF" );
//     } else {
//         $( "body" ).addClass( "dark" );
//         $( ".change" ).text( "ON" );
//     }
// });


const changeButton = document.querySelector('.change');
const body = document.querySelector('main');

changeButton.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    changeButton.textContent = 'OFF';
  } else {
    body.classList.add('dark');
    changeButton.textContent = 'ON';
  }
});
