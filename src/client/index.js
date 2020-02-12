const port = 'http://localhost:3000';
import './styles/form.scss'
import './styles/style.scss'
import './styles/resets.scss'
import './image/background.png'
import samplePht from './image/samplePhoto.jpg'
import clearDay from './image/weather-icons/clear-day.jpg'
import clearNight from './image/weather-icons/clear-night.jpg'
import cloudy from './image/weather-icons/cloudy.jpg'
import fog from './image/weather-icons/fog.jpg'
import partlyCloudyDay from './image/weather-icons/partly-cloudy-day.jpg'
import partlyCloudyNight from './image/weather-icons/partly-cloudy-night.jpg'
import rain from './image/weather-icons/rain.jpg'
import sleet from './image/weather-icons/sleet.jpg'
import snow from './image/weather-icons/snow.jpg'
import thunderstorm from './image/weather-icons/thunderstorm.jpg'
import wind from './image/weather-icons/wind.jpg'
import header from './image/header-logo.jpg'
import {hndlDestinationSubmit, hndlDestDropDown} from './js/defineTrip.js';
import {hndlDateSubmit} from './js/defineTripDates.js';
import {hndlDeleteTrip} from './js/deleteTrip.js'
import {testServer} from './js/testServer.js'
// const hndlDestinationSubmit = require('./js/defineTrip.js');
// const defineTrip = require('./js/defineTrip.js');



//Setup header

var homeImg = document.getElementById('header');
homeImg.src = header;
testServer();

export {
  hndlDestinationSubmit, hndlDestDropDown, port, hndlDateSubmit, hndlDeleteTrip
};
