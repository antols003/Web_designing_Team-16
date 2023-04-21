
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const progressBar = document.getElementById('progress-bar');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const songLyrics = document.getElementById('song-lyrics');
const playlistItems = document.querySelectorAll('.playlist ul li a');

let currentSong = 0;

// Load the first song in the playlist when the page loads
loadSong(currentSong);

// Load a new song when the user clicks on a playlist item
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentSong = index;
        loadSong(currentSong);
    });
});

function loadSong(songIndex) {
    const selectedSong = playlistItems[songIndex];
    audioPlayer.src = selectedSong.getAttribute('data-src');
    songTitle.textContent = selectedSong.getAttribute('data-title');
    artistName.textContent = selectedSong.getAttribute('data-artist');
    songLyrics.textContent = selectedSong.getAttribute('data-lyrics');
    playSong();
}

function playSong() {
    audioPlayer.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
}

function pauseSong() {
    audioPlayer.pause();
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

function updateProgressBar() {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;
}

audioPlayer.addEventListener('timeupdate', updateProgressBar);

playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);