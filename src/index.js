import './stylesheets/main.scss';

import '@babel/polyfill';

import './js/helpers'; // It's empty
import './js/functions';
import './js/packedges';

import { DarkMode, Interface } from './js/classes';

Interface.activate();

DarkMode.activate();
