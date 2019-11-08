function correctSizing() {
  let vh = window.innerHeight;
  if (vh > window.screen.height) vh /= window.devicePixelRatio;
  document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
}

function firstViewportCorrection() {
  correctSizing();
  window.addEventListener('resize', e => {
    correctSizing();
  });
}

setTimeout(firstViewportCorrection(), 0);
