
// audio sorce and volume assignment on top

let allMediaLibrary = [{
    songNo: 1,
    songName: "Lake",
    artistName: "Janee",
    songPath: "/Source/music/Lake.mp3",
    coverArt: "/Source/CoverArt/Lake.jpg"
},
{
    songNo: 2,
    songName: "Royalty",
    artistName: "Egzod & Maestro Chives",
    songPath: "/Source/music/Royalty.mp3",
    coverArt: "/Source/CoverArt/Royalty.jpg"
},
{
    songNo: 3,
    songName: "Symphony",
    artistName: "Arc North",
    songPath: "/Source/music/Symphony.mp3",
    coverArt: "/Source/CoverArt/Symphony.jpg"
},
{
    songNo: 4,
    songName: "Careless",
    artistName: "NEFFEX!",
    songPath: "/Source/music/Careless.mp3",
    coverArt: "/Source/CoverArt/Careless.jpg"
},
{
    songNo: 5,
    songName: "Why Do I",
    artistName: "Unkown Brain",
    songPath: "/Source/music/Unkown.mp3",
    coverArt: "/Source/CoverArt/Unknown.jpg"
}, {
    songNo: 6,
    songName: "It's Alright",
    artistName: "Mother Mother",
    songPath: "/Source/music/Alright.mp3",
    coverArt: "/Source/CoverArt/Alright.jpg"
}]


// Play, Pause, stop song and song progress bar slectors------>
let masterPlay = document.querySelector('.master-play');
const stopBtn = document.querySelector('.master-stop');
const progressBar = document.querySelector('.seek-bar');
const songList = document.querySelectorAll('.song-playing');

const get = document.querySelector('.current-time'); // Current time of Track
const get2 = document.querySelector('.song-duration');// Total Duration Of Track
const nextSong = document.querySelector('.fa-forward'); // Play Next Song
const prevSong = document.querySelector('.fa-backward'); // Play Previous Song

// volume control sections------>
const volBar = document.getElementById('vol-bar'); // Volume Bar
const muteVol = document.querySelector('.mute-btn') // Mute Volume Function

// Cover-Art and Styling selector------>
const coverArt = document.getElementById('coverArt'); // Covert Art Selector
const musicStyle = document.querySelector('.art-sec'); //covart behind round fill animation selector
const coverBack = document.querySelector('.player-src'); // Cover Background
const trackNo = document.querySelector('.playlist-number'); // Current Track Number
const trackTitle = document.querySelector('.song-title'); // Current Track Title
const trackArtist = document.querySelector('.song-artist') // Current Track Artist Name

const trackToggle = document.querySelector('.playlist'); // It will toggle Playlist Menu in Mobile view!
const themeSelect = document.querySelector('.theme-box') // Theme-box for different theme
const themeSwitchBtn = document.getElementById('theme-toggle'); // Theme Toggle Button

// Event Listener to open-close theme menu and Track-list---->
themeSwitchBtn.addEventListener('click', () => {
    themeSelect.classList.toggle('switcher')
    console.log('hello')
})
trackToggle.addEventListener('click', () => {
    trackToggle.classList.toggle('reveal');
})

// main audio Source, index and Sound Volume Set Here--------------->
let i = 0;
let gaana = new Audio(allMediaLibrary[i].songPath)
gaana.volume = 0.2;
gaana.src = allMediaLibrary[i].songPath;

function songCurrentStatus() {
    coverArt.src = allMediaLibrary[i].coverArt;
    coverBack.style.backgroundImage = `url(${allMediaLibrary[i].coverArt})`
    trackTitle.innerText = allMediaLibrary[i].songName;
    trackNo.innerText = allMediaLibrary[i].songNo + ' / ' + allMediaLibrary.length;
    trackArtist.innerText = allMediaLibrary[i].artistName;
}


// Song Stop or end function here----->
function gannaEnd() {
    gaana.pause();
    gaana.currentTime = 0;
    coverArt.style.animationPlayState = 'paused';
    coverArt.style.animationIterationCount = 0;
    songPauseAnimation()
}

// Song PLay/Pause and stopToggle functions--------->

function songplayAnimation() {
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
}

function songPauseAnimation() {
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play')
}

function songPlayStatus() {
    if (gaana.paused) {
        gaana.play();
        coverArt.style.animationPlayState = 'running';
        coverArt.style.animationIterationCount = 'infinite';
        songplayAnimation()
    }
    else {
        gaana.pause();
        coverArt.style.animationPlayState = 'paused';
        songPauseAnimation()
    }
}

//Master - play/Pause , Previous/Next Song Button and their event listener---->
masterPlay.addEventListener('click', () => {
    activeSong()
    songPlayStatus()
})

let newArray = Array.from(songList);

function activeSong() {
    if (newArray[i].classList.contains('active')) {
        newArray[i].classList.remove('active');
        
    }
    else {
        newArray.forEach(songArr => {
            songArr.classList.remove('active')
        })
        newArray[i].classList.add('active');
    }

}
//next song
nextSong.addEventListener('click', () => {
    if (i < allMediaLibrary.length - 1) {
        i++;
        gaana.src = allMediaLibrary[i].songPath;
        songCurrentStatus()
        activeSong()
    } else {
        i = 0;
        gaana.src = allMediaLibrary[i].songPath;
        songCurrentStatus()
        activeSong()
    }

    songPlayStatus()
})
//previous Song
prevSong.addEventListener('click', () => {
    if (i > 0) {
        i--;
        gaana.src = allMediaLibrary[i].songPath;
        songCurrentStatus()
        activeSong()
    } else {
        i = allMediaLibrary.length - 1;
        gaana.src = allMediaLibrary[i].songPath;
        songCurrentStatus()
        activeSong()
    }
    songPlayStatus()
})


// function and event listner for song selection and play from song list--------> 
function songNumber(songs, i) {
    songs.addEventListener('click', () => {

        if (songs.classList.contains('active')) {
            songs.classList.remove('active')
        } else {
            songList.forEach(song => {
                song.classList.remove('active')
            })
            songs.classList.add('active')
        }
        console.log(i)
        gaana.src = allMediaLibrary[i].songPath;
        songPlayStatus(i)
        coverArt.src = allMediaLibrary[i].coverArt;
        coverBack.style.backgroundImage = `url(${allMediaLibrary[i].coverArt})`
        trackTitle.innerText = allMediaLibrary[i].songName;
        trackNo.innerText = allMediaLibrary[i].songNo + ' / ' + allMediaLibrary.length;
        trackArtist.innerText = allMediaLibrary[i].artistName;
    })
}
songList.forEach(songNumber);



//song Stop---->
stopBtn.addEventListener('click', () => {
    gannaEnd();
})

// On Song Time update, Progress Bar Update, current time update----------->
gaana.addEventListener('timeupdate', () => {
    progressBar.setAttribute('max', gaana.duration)
    progressBar.value = gaana.currentTime;
    progressBar.style.backgroundImage = `linear-gradient( to right,
        var(--style-color) ${((gaana.currentTime / gaana.duration) * 100)}%, 
        #fff ${((gaana.currentTime / gaana.duration) * 100)}% )`

    //to Display current duration of song------>
    let mm = Math.floor((gaana.currentTime / 60));
    let ss = Math.floor((gaana.currentTime % 60));
    get.innerText = `${mm}m:${ss}s`;
    let mmm = Math.floor((gaana.duration / 60));
    let sss = Math.floor((gaana.duration % 60));
    get2.innerText = `${mmm}m:${sss}s`

    //Behind Cover Art style -------->
    musicStyle.style.backgroundImage = `conic-gradient(var(--style-color) 
        ${((gaana.currentTime / gaana.duration) * 100)}%,
         #fff ${((gaana.currentTime / gaana.duration) * 100)}% )`

    // Song End---->
    if (gaana.currentTime >= gaana.duration) {
        if (i < allMediaLibrary.length - 1) {
            i++;
            gaana.src = allMediaLibrary[i].songPath;
            songCurrentStatus()
            songPlayStatus()
            console.log(i)
        } else {
            i = 0;
            gaana.src = allMediaLibrary[i].songPath;
            songCurrentStatus()
            songPlayStatus()
        }
    }
})


progressBar.addEventListener('input', () => {
    gaana.currentTime = progressBar.value;
})


//volume control section------------->

//volume Bar update on volume update function here----->
function volBarCtrl() {
    volBar.style.backgroundImage = `
        linear-gradient( to right, var(--style-color) 
        ${gaana.volume * 100}%, 
        #fff ${gaana.volume * 100}% )`;
    volBar.value = gaana.volume * 100;
}


volBarCtrl();
volBar.addEventListener('input', () => {
    gaana.volume = volBar.value / 100;
    volBarCtrl();
})

muteVol.addEventListener('click', () => {
    if (gaana.volume !== 0) {
        gaana.volume = 0;
        muteVol.classList.remove('fa-volume-high');
        muteVol.classList.add('fa-volume-xmark')
        volBarCtrl()

    }
    else {
        gaana.volume = 0.2;
        muteVol.classList.remove('fa-volume-xmark');
        muteVol.classList.add('fa-volume-high')
        volBarCtrl()
    }
})



