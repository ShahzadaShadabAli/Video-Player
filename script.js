const player = document.querySelector('.player')
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.querySelector('#btn-play');
const volumeIcon = document.querySelector('#volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapse');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

let widthPercentage = ''
let dynamicCurrentTime = ''
let dynamicDuration = ''
let minute = 60


// Play & Pause ----------------------------------- //
let isPlaying = false

function togglePlay() {
    if (video.paused) {
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause')
    } else {
        video.pause()
        playBtn.classList.replace('fa-pause', 'fa-play')
    }
}

// Progress Bar ---------------------------------- //

//To Update The Progress
function progressUpdate() {
    widthPercentage = (video.currentTime / video.duration) * 100
    //Dynamic Progress Bar
    progressBar.style.width = `${widthPercentage}%`
    //Dynamic Progress Value
    dynamicCurrentTime = Math.floor(video.currentTime % minute)
    currentTime.textContent = `0:0${dynamicCurrentTime.toString()} /`

    dynamicDuration = Math.floor(video.duration % minute)
    duration.textContent = `0:${dynamicDuration.toString()}`

}

function updateProgressBar(e) {
    const newTime = (e.offsetX / progressRange.offsetWidth)
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration
}
// Volume Controls --------------------------- //
let lastVolume = 1
function updateVolumeBar(e) {
    let volume = e.offsetX / volumeRange.offsetWidth
    if (volume < 0.1) {
        volume = 0
    }
    if (volume > .9) {
        volume = 1
    }

    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume

    //Changing Of icon with volume
    volumeIcon.className = '';
    if (volume >= 7) {
        volumeIcon.classList.add('fas', 'fa-volume-up')
    } else if (volume < 7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down')
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute')
    }

    lastVolume = volume

}

function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume
        video.volume = 0
        volumeBar.style.width = 0
        volumeIcon.classList.add('fas', 'fa-volume-mute')
        volumeIcon.setAttribute('title', 'Unmute')
    } else {
        video.volume = lastVolume
        volumeBar.style.width = `${lastVolume}%`
        volumeIcon.classList.add('fas', 'fa-volume-down')
        volumeIcon.setAttribute('title', 'Mute')
    }
}


// Change Playback Speed -------------------- //

function playbackRate() {
    video.playbackRate = speed.value
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

let fullscreen = false

//Toggle Fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player)
        fullscreenBtn.children[0].classList.replace('fa-expand', 'fa-compress')
    } else {
        closeFullscreen(player)
        fullscreenBtn.children[0].classList.replace('fa-compress', 'fa-expand')
    }

    fullscreen = !fullscreen

}

//Event Listeners
video.addEventListener('click', togglePlay)
video.addEventListener('ended', function () {
    playBtn.classList.replace('fa-pause', 'fa-play')
})
playBtn.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', progressUpdate)
video.addEventListener('canplay', progressUpdate)
progressRange.addEventListener('click', updateProgressBar)
volumeRange.addEventListener('click', updateVolumeBar)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', playbackRate)
fullscreenBtn.addEventListener('click', toggleFullscreen)