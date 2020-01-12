import { elements } from '../utils/elements';

const { app } = elements;

export const toggleAppState = () => {
  app.classList.toggle('active');
};

export const isAppActive = () => !!app.classList.contains('active');
