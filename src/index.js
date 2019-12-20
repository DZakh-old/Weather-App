import './stylesheets/main.scss';

import '@babel/polyfill';

import { realVhHeight } from './js/functions/real-vh-height';
import Interface from './js/handlers/Interface';

realVhHeight();
Interface.activate();
