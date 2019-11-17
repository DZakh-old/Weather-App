import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers'; // It's empty
import './js/functions';
import './js/packedges';

import Interface from './js/classes/Interface';
import DarkMode from './js/classes/DarkMode';

Interface.activate();

DarkMode.activate();
