video = document.querySelector("video");
addEvents(video);

document.addEventListener("DOMContentLoaded", event => {
    video = document.querySelector("video");
    addEvents(video);
})

document.addEventListener("DOMNodeInserted", event => {
    if (event.target.nodeName === "VIDEO") {
        addEvents(event.target);
    }
});

function addEvents(node) {
    node.addEventListener("ended", end_fullscreen);
    // The ended event is not always thrown by youtube. We will check on pause event if the video ended
    node.addEventListener("pause", paused_video);
}



function end_fullscreen() {
    // Find out if autoplay is active
    let autoplay_active = false;

    let desktop_container = document.querySelector(".ytp-autonav-toggle-button");
    if (desktop_container !== null && desktop_container.hasAttribute("aria-checked") && desktop_container.getAttribute("aria-checked") === 'true') {
        autoplay_active = true;
    }

    let mobile_container = document.querySelector(".ytm-autonav-toggle-button-container");
    if (mobile_container != null && mobile_container.hasAttribute("aria-pressed") && mobile_container.getAttribute("aria-pressed") === 'true') {
        autoplay_active = true;
    }

    if (autoplay_active === false) {
        if (window.fullScreen) {
            document.exitFullscreen();
        }
    }
}

function paused_video() {
    video = document.querySelector("video");
    let duration = video.duration;
    let currentTime = video.currentTime;
    /** 
     * If playback stopped with less than a second of the video left: exit fullscreen 
     * If the end is reached through seeking the video position is not exactly at the end
     * */
    if (duration - currentTime < 10) {
        end_fullscreen();
    }
}