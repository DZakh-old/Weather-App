import './stylesheets/main.scss';

import '@babel/polyfill';
import './js/packages/lazysizes';

import { realVhHeight } from './js/functions';

import Interface from './js/classes/Interface';

realVhHeight();
Interface.activate();
