const correctSizing = () => {
  // Bug fix
  // let vh = window.innerHeight;
  // if (vh > window.screen.height) vh /= window.devicePixelRatio;
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
};

const firstViewportCorrection = () => {
  correctSizing();
  window.addEventListener('orientationchange', () => {
    const afterOrientationChange = () => {
      correctSizing();
      window.removeEventListener('resize', afterOrientationChange);
    };
    window.addEventListener('resize', afterOrientationChange);
  });
};

setTimeout(firstViewportCorrection(), 0);
