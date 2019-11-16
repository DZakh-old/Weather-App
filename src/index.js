import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers';
import './js/functions';
import './js/packedges';

import DarkMode from './js/classes/DarkMode';
import Interface from './js/classes/Interface';

Interface.activate();

DarkMode.activate();
