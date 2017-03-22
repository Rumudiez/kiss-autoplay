var videoElement    = document.querySelector('video'),
    backdropElement = document.createElement('div'),
    nextButton      = document.getElementById('btnNext'),
    fullscreenStyle = 'position:fixed;top:0;left:0;width:100vw;height:100vh;',
    fullscreened    = true;

if (videoElement) {
  setStyles();
  if (!videoElement.autoplay) {
    videoElement.play();
  }
  videoElement.addEventListener('ended', function(){
    if (nextButton) {
      nextButton.click();
    }
  });
  // can't do this because of required user interaction
  // videoElement.requestFullScreen();

  document.addEventListener('keyup', function(e){
    // allow escape key to toggle fullscreen styles
    if (e.key === 'Escape') {
      if (fullscreened) {
        clearStyles();
      } else {
        setStyles();
      }
    }
  });
}

function setStyles() {
  fullscreened = true;
  videoElement.style = fullscreenStyle + 'z-index:99999;';
  backdropElement.style = fullscreenStyle + 'z-index:99998;background:#000';
  document.body.appendChild(backdropElement);
}

function clearStyles() {
  fullscreened = false;
  videoElement.style = '';
  document.body.removeChild(backdropElement);
}
