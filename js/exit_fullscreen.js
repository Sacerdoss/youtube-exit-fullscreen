let videos = document.querySelectorAll("video");

videos.forEach(video => {
    video.addEventListener("ended", (e) => {
        // Find out if autoplay is active
        let autoplay_active = document.querySelector(".ytp-autonav-toggle-button").getAttribute("aria-checked")
        if (autoplay_active !== 'true') {
            document.exitFullscreen();
        }
    });
})