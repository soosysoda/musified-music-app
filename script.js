//initialize datas
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play")
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const progressbar = document.getElementById("progressBar");
const songImage = document.getElementById("image");
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songDuration = document.getElementById('song-duration');
const durspace = document.getElementById('dur');
const timer = document.getElementById('timer');
const audio = new Audio();

//song list
const allSongs = [{
    id: 0,
    title: "Teri Ore",
    artist: "Shreya Ghoshal",
    duration: "5:39",
    src: "songs\\Teri Ore.mp3",
    coverpath: "covers\\ab67616d0000b2731a62ae27c9f6aa78c929eb33.jpeg"
},
{
    id: 1,
    title: "Tere Mast Mast Do Nain",
    artist: "Rahat Fateh Ali Khan",
    duration: "5:58",
    src: "songs\\Tere Mast Mast Do Nain.mp3",
    coverpath: "covers\\ab67616d0000b2736e28d74c8eddc32542ce8924.jpeg"
},
{
    id: 3,
    title: "Halka Halka (From Fanney Khan)",
    artist: "Amit Trivedi",
    duration: "4:07",
    src: "songs\\Halka Halka (From _Fanney Khan_).mp3",
    coverpath: "covers\\ab67616d0000b2734799fd746fd2bb45ae9952f3.jpeg"
},
{
    id: 4,
    title: "Choo Lo",
    artist: "The Local Train",
    duration: "3:54",
    src: "songs\\Choo Lo.mp3",
    coverpath: "covers\\ab67616d0000b27358ecb3e5ec3bbef70ee09e43.jpeg"
},
{
    id: 5,
    title: "Maahi Ve",
    artist: "A R Rahman",
    duration: "4:00",
    src: "songs\\Maahi Ve.mp3",
    coverpath: "covers\\ab67616d0000b2731f4e9ecaf6913e207810093f.jpeg"
},
{
    id: 6,
    title: "O Rangrez",
    artist: "Javed Bashir",
    duration: "6:25",
    src: "songs\\O Rangrez.mp3",
    coverpath: "covers\\ab67616d0000b273fd2df008046f04c32d9c0c2e.jpeg"
},
{
    id: 7,
    title: "Ye Tune Kya Kiya",
    artist: "Javed Bashir",
    duration: "5:14",
    src: "songs\\Ye Tune Kya Kiya.mp3",
    coverpath: "covers\\ab67616d0000b273fe77bd21eb38ff74b5f21524.jpeg"
},
{
    id: 8,
    title: "Soniyo",
    artist: "Sonu Nigam",
    duration: "5:28",
    src: "songs\\Soniyo.mp3",
    coverpath: "covers\\ab67616d0000b273bf8dad28cba0f3680ee29364.jpeg"
},
{
    id: 9,
    title: "Sage",
    artist: "Ritviz",
    duration: "3:50",
    src: "songs\\Sage.mp3",
    coverpath: "covers\\ab67616d0000b273677c4cabe500b906c4a8e207.jpeg"
}]
let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0
};

//play-function
const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id);
    audio.src = song.src;
    audio.title = song.title;
    if (userData?.currentSong === null || userData?.currentSong.id !== song.id){
        audio.currentTime = 0;
    }else{
        audio.currentTime = userData?.songCurrentTime;
    }
    userData.currentSong = song;
    setSongDisplay();
    durspace.textContent = userData?.currentSong?.duration;
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause');
    audio.play();
}

//pause-function
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
    audio.pause();
}

//nextsong-function & prevSong-function
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

const playNextSong = () => {
    if (userData?.currentSong === null)playSong(userData?.songs[0].id);
    else{
        const currentSongIndex = getCurrentSongIndex();
        playSong(userData?.songs[currentSongIndex + 1].id);
    }
}

const playPrevSong = () => {
    if (userData?.currentSong === null) return;
    else {
        const currentSongIndex = getCurrentSongIndex();
        playSong(userData?.songs[currentSongIndex - 1].id);
    }
}

//shuffle-function
const shuffle = () => {
    userData?.songs.sort(() => Math.random() - 0.5);
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    renderSongs(userData?.songs);
    pauseSong();
}

//delete-function
const deleteSong = (id) => {
    if (userData?.currentSong?.id === id){
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
    }

    userData.songs = userData?.songs.filter((song) => song.id !== id);
    renderSongs(userData?.songs);

    if (userData?.songs.length === 0) {
        const resetButton = document.createElement("button");
        const resetText = document.createTextNode("Reset Playlist");
    
        resetButton.id = "reset";
        resetButton.ariaLabel = "Reset playlist";
        resetButton.appendChild(resetText);
        playlistSongs.appendChild(resetButton);
    
        resetButton.addEventListener("click", () => {
          userData.songs = [...allSongs];
          renderSongs(sortSongs()); 
          setPlayButtonAccessibleText();
          resetButton.remove();
        });
    }
}

//render-function
const renderSongs = (array) => {
    const songsHTML = array.map((song) => {
        return `
        <li id="song-${song.id}" class="playlist-song">
            <button class="playlist-song-info" onclick="playSong(${song.id})">
                <span class="playlist-song-title">${song.title}</span>
                <br>
                <span class="playlist-song-artist">${song.artist}</span>
                <span class="playlist-song-duration">${song.duration}</span>
            </button>
            <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
                <i class="fa-solid fa-2x fa-trash" style="color: red;"></i>
            </button>
        </li>
        `
    }).join("");
    playlistSongs.innerHTML = songsHTML;
}

const setSongDisplay = () => {
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;
    const currentDuration = userData?.currentSong?.duration;
    const currentCover = userData?.currentSong?.coverpath;

    songImage.src = currentCover;
    songTitle.textContent = currentTitle? currentTitle : "";
    songArtist.textContent = currentArtist? currentArtist : "";
    songDuration.textContent = currentDuration? currentDuration : "";
    
}



playButton.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0){
        if (userData?.currentSong === null) playSong(userData?.songs[0].id);
        else playSong(userData?.currentSong.id);
    }else{
        pauseSong();
    }
});

nextButton.addEventListener('click', playNextSong);
previousButton.addEventListener('click', playPrevSong);
shuffleButton.addEventListener('click', shuffle);

//progress-bar
audio.addEventListener('timeupdate', () => {
    progress = parseInt((audio.currentTime/audio.duration)*100);
    progressbar.value = progress;
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);
    console.log(seconds);
    if (seconds < 10)seconds = `0${seconds}`;
    timer.innerText = `${minutes}:${seconds}`;
})

progressbar.addEventListener('change', () => {
    audio.currentTime = progressbar.value * audio.duration/100;
})

audio.addEventListener('ended', () => {
    const currentSongIndex = getCurrentSongIndex();
    const nextsongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextsongExists)playNextSong();
    else{
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
    }
});

//sort-function
const sortSongs = () => {
    userData?.songs.sort((a, b) => {
        if (a.title > b.title)return 1;
        else if (a.title < b.title)return -1;
        return 0;
    });
    return userData?.songs;
}

renderSongs(sortSongs());
