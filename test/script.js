console.log("Welcome to the Spotify Clone");

// Initialize the variables
let songIndex = 0;
const audioElement = new Audio("songs/1.mp3");
const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const songItems = Array.from(document.getElementsByClassName("songItem"));
const songItemPlay = Array.from(
  document.getElementsByClassName("songItemPlay")
);
const prevBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const currentSong = document.getElementById("currentSong");

const playlist = [
  {
    songName: "Warriyo - Mortals",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "My Heart",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "songs/4.mp3",
    coverPath: "covers/10.jpg",
  },
];

playlist.forEach((song, i) => {
  const songItem = songItems[i];
  const songCoverEl = songItem.getElementsByTagName("img")[0];
  const songNameEl = songItem.getElementsByClassName("songName")[0];

  songCoverEl.src = song.coverPath;
  songNameEl.innerText = song.songName;
});

// LISTEN EVENTS

// Update the play/pause button on the song list
function updateSongListButtons() {
  songItemPlay.forEach((song, index) => {
    if (index === songIndex) {
      song.classList.toggle("fa-circle-play", audioElement.paused);
      song.classList.toggle("fa-circle-pause", !audioElement.paused);
    } else {
      song.classList.remove("fa-circle-pause");
      song.classList.add("fa-circle-play");
    }
  });
}

// handle play/pause button
masterPlay.addEventListener("click", function () {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    this.classList.remove("fa-circle-play");
    this.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    this.classList.remove("fa-circle-pause");
    this.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }

  updateSongListButtons();
});

// handling SeekBar
audioElement.addEventListener("timeupdate", function () {
  //   update seekbar
  const progress = parseInt((this.currentTime / this.duration) * 100);
  myProgressBar.value = progress;
});

let isSeeking = false;

myProgressBar.addEventListener("mousedown", () => {
  isSeeking = true;
});
myProgressBar.addEventListener("mouseup", () => {
  isSeeking = false;
});
myProgressBar.addEventListener("input", function () {
  if (isSeeking) {
    const seekTime = (this.value * audioElement.duration) / 100;
    audioElement.currentTime = seekTime;
  }
});

// play a song from the list:
const makeAllPlays = (e) => {
  songItemPlay.forEach((song) => {
    song.classList.remove("fa-circle-pause");
    song.classList.add("fa-circle-play");
  });
};

songItemPlay.forEach((song) =>
  song.addEventListener("click", (e) => {
    songIndex = parseInt(e.target.id);
    makeAllPlays();
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    audioElement.currentTime = 0;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.play();
    currentSong.innerText = playlist[songIndex].songName;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  })
);

// next button
nextBtn.addEventListener("click", function (e) {
  songIndex = (songIndex + 1) % playlist.length; // Cycle to the first song if at the end
  playSelectedSong();
});

// previous button
previousBtn.addEventListener("click", function (e) {
  songIndex = (songIndex - 1 + playlist.length) % playlist.length; // Cycle to the last song if at the beginning
  playSelectedSong();
});

// Function to play the selected song
function playSelectedSong() {
  audioElement.currentTime = 0;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  currentSong.innerText = playlist[songIndex].songName;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;

  // Update the play/pause button on the song list
  updateSongListButtons();
}
