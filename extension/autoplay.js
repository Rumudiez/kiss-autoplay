let fullscreened = false;
const fullscreenStyle = 'position:fixed;top:0;left:0;width:100vw;height:100vh;';

const elements = new (function(){
  this.video = document.querySelector('video');

  this.backdrop = document.createElement('div');
  this.backdrop.style = fullscreenStyle + 'z-index:99998;background:#000';

  this.nextButton = document.getElementById('btnNext');
  this.nextButton = this.nextButton.parentElement;

  this.update = () => {
    this.video      = document.querySelector('video');
    this.nextButton = document.getElementById('btnNext');
    return !this.video || !this.nextButton;
  };
})();

(function autostart() {
  if (elements.update()) {
    new Promise(setTimeout.bind(undefined, autostart, 500));
  } else {
    setFullscreen(true);
    if (!elements.video.autoplay) {
      autoplay(0);
    }
    elements.video.addEventListener('ended', function(){
      if (elements.nextButton) {
        elements.nextButton.click();
      }
    });

    document.addEventListener('keyup', function(e){
      if (e.key === 'Escape') {
        setFullscreen(!fullscreened)
      }
    });
  }
})();

function setFullscreen(fullscreen) {
  if (fullscreen) {
    if (!fullscreened) {
      elements.video.style = fullscreenStyle + 'z-index:99999;';
      document.body.appendChild(elements.backdrop);
    }
  } else if (fullscreened) {
    elements.video.style = '';
    document.body.removeChild(elements.backdrop);
  }
  fullscreened = fullscreen;
}

function autoplay(delay) {
  try {
    elements.video.play();
  } catch (e) {
    delay += 100;
    setTimeout(function(){
      autoplay(delay);
    }, delay);
  }
}
