import elements from '../../app-elements';

const { app } = elements;

export const toggleAppState = () => {
  app.classList.toggle('active');
};

export const appIsActive = () => !!app.classList.contains('active');
