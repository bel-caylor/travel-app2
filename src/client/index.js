const port = 'http://localhost:3000';
import './styles/style.scss'
import './styles/resets.scss'
import './image/background.png'
import {hndlDestinationSubmit} from './js/defineTrip.js';
// const hndlDestinationSubmit = require('./js/defineTrip.js');
// const defineTrip = require('./js/defineTrip.js');

//Setup header
import header from './image/header-logo.jpg'
var homeImg = document.getElementById('header');
homeImg.src = header;

//Setup trip

export {
  hndlDestinationSubmit, port
};
