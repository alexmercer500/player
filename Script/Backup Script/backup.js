const songList = document.getElementById('song-items');

const URL = 'Script/data.json';
function fetchSongList() {
    fetch(URL).then(Response => Response.json()
    ).then(data => {
        console.log(data);

        data.map(songData => {
            songList.innerHTML += `<h2 class="songs-list">${songData.songName} - ${songData.artistName} </h2>`
        })
    }).catch(error => {
        console.log(error)
    })
}

fetchSongList()



// function PopulateSongData(finalSong) {
//     songList.innerHTML += `<h2 class="songs-list">${finalSong.songNo}. ${finalSong.songName} - ${finalSong.artistName} </h2>`
//     console.log(finalSong.songPath)
//     let gaanaOne = new Audio(`${finalSong.songPath}`)
//     const playListPlay = document.querySelectorAll('.songs-list')
//     playListPlay.forEach(playBtn => {
//         playBtn.addEventListener('click', () => {
//             console.log("please chal Ja re babu")
//             gaanaOne.paused ? gaanaOne.play() : gaanaOne.pause()
//             gaanaOne.paused ? songPauseAnimation() : songplayAnimation()
//             gaanaOne.volume = 0.3;
//         })
//     })
// }

// function getRawSongData() {
//     let songsInfo = fetchSongList()
//     songsInfo.then(data => {
//         let newData = data.map(getData => getData)

//         newData.forEach(getSongData => {
//             PopulateSongData(getSongData)
//         });
//     })
// }

// getRawSongData()


// 1. Lake - Janee
// 2. Royalty - Egzod & Maestro Chives
// 3. Symphony - Arc North
// 4. Careless - NEFFEX!
// 5. Why Do I - Unkown Brain
// 6. It's Alright - Mother Mother

songList.forEach(song => {
    song.addEventListener('click', () => {

        if (song.classList.contains('active')) {
            song.classList.remove('active')
        }
        else {
            songList.forEach(songTo => {
                songTo.classList.remove('active')
            })
            song.classList.add('active')
        }
    })
})