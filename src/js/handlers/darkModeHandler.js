import { elements } from '../utils/app-elements';

const { app, darkModeIcon, darkModeBtn } = elements;

const isDarkMode = () => +localStorage.getItem('dark-mode');

const storeDarkMode = () => localStorage.setItem('dark-mode', isDarkMode() ? 0 : 1);

const switchDarkModeIcon = () => {
  darkModeIcon.classList.toggle('icon-moon');
  darkModeIcon.classList.toggle('icon-weather-01');
};

const toggleDarkMode = () => {
  app.classList.toggle('dark-mode');
  switchDarkModeIcon();
};

export const activateDarkMode = () => {
  if (isDarkMode()) {
    toggleDarkMode();
  }
  darkModeBtn.addEventListener('click', () => {
    toggleDarkMode();
    storeDarkMode();
  });
};
