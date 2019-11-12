export default class DarkMode {
  static isDark() {
    return +localStorage.getItem('dark');
  }

  static storeMode() {
    localStorage.setItem('dark', DarkMode.isDark() ? 0 : 1);
  }

  static toggleIcon() {
    const darkmodeIcon = document.querySelector('.control__dark-mode-icon');
    darkmodeIcon.classList.toggle('icon-moon');
    darkmodeIcon.classList.toggle('icon-weather-01');
  }

  static toggleMode() {
    const body = document.querySelector('body');
    body.classList.toggle('darkmode');
    DarkMode.toggleIcon();
  }

  static activate() {
    if (DarkMode.isDark()) {
      DarkMode.toggleMode();
    }
    const darkmodeBtn = document.getElementById('dark-mode');
    darkmodeBtn.addEventListener('click', () => {
      DarkMode.toggleMode();
      DarkMode.storeMode();
    });
  }
}
