const correctSizing = () => {
  // Bug fix
  // let vh = window.innerHeight;
  // if (vh > window.screen.height) vh /= window.devicePixelRatio;
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
};

const firstViewportCorrection = () => {
  /* If mobile */
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    correctSizing();
    window.addEventListener('orientationchange', () => {
      const afterOrientationChange = () => {
        correctSizing();
        window.removeEventListener('resize', afterOrientationChange);
      };
      window.addEventListener('resize', afterOrientationChange);
    });
  }
};

setTimeout(firstViewportCorrection(), 0);
