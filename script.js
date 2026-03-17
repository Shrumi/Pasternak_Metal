const tracks = [
    { name: "Свеча горела (Heavy Cover)", src: "track1.mp3" },
    { name: "Любить иных — тяжелый крест", src: "track2.mp3" },
    { name: "Свеча горела (Remastered)", src: "track3.mp3" }
];

const audio = document.getElementById('audio-core');
const playBtn = document.getElementById('play-btn');
const progress = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const volumeSlider = document.getElementById('volume-slider');
const currentTitle = document.getElementById('current-title');
const playlistItems = document.querySelectorAll('.playlist__item');
const playerContainer = document.getElementById('main-player');

let currentTrackIndex = 0;

const updateUI = () => {
    currentTitle.textContent = tracks[currentTrackIndex].name;
    playlistItems.forEach((item, index) => {
        item.classList.toggle('playlist__item--active', index === currentTrackIndex);
    });
};

const handlePlayPause = () => {
    if (audio.paused) {
        audio.play();
        playerContainer.classList.add('player--playing');
    } else {
        audio.pause();
        playerContainer.classList.remove('player--playing');
    }
};

const switchTrack = (index) => {
    if (currentTrackIndex === index) return;
    currentTrackIndex = index;
    audio.src = tracks[currentTrackIndex].src;
    updateUI();
    audio.play();
    playerContainer.classList.add('player--playing');
};

// Listeners
playBtn.addEventListener('click', handlePlayPause);

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${percent}%`;
});

progress.addEventListener('click', (e) => {
    const width = progress.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => switchTrack(index));
});

audio.addEventListener('ended', () => {
    let next = (currentTrackIndex + 1) % tracks.length;
    switchTrack(next);
});

// Init
updateUI();