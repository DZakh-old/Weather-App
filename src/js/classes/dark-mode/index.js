export default class DarkMode {
  static toggleIcon() {
    const darkmodeIcon = document.querySelector('.control__dark-mode-icon');
    darkmodeIcon.classList.toggle('icon-moon');
    darkmodeIcon.classList.toggle('icon-weather-01');
  }

  static activate() {
    const darkmodeBtn = document.getElementById('dark-mode');
    const body = document.querySelector('body');

    darkmodeBtn.addEventListener('click', () => {
      DarkMode.toggleIcon();
      body.classList.toggle('darkmode');
    });
  }
}
