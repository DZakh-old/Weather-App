import { elements } from '../../appElements';

const { app } = elements;

export const toggleAppState = () => {
  app.classList.toggle('active');
};

export const appIsActive = () => !!app.classList.contains('active');
