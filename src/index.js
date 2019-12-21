import './stylesheets/main.scss';

import '@babel/polyfill';

import { realVhHeight } from './js/functions/realVhHeight';
import { activateInterface } from './js/handlers/interfaceHandler';

realVhHeight();
activateInterface();
