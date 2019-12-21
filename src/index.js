import './stylesheets/main.scss';

import '@babel/polyfill';

import { realVhHeight } from './js/functions/real-vh-height';
import { activateInterface } from './js/handlers/interfaceHandler';

realVhHeight();
activateInterface();
