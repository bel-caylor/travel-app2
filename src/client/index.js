const port = 'http://localhost:3000';
import './styles/form.scss'
import './styles/style.scss'
import './styles/resets.scss'
import './image/background.png'
import {hndlDestinationSubmit, hndlDestDropDown} from './js/defineTrip.js';
import {hndlDateSubmit} from './js/defineTripDates';
// const hndlDestinationSubmit = require('./js/defineTrip.js');
// const defineTrip = require('./js/defineTrip.js');

const testServer = async () => {
  const response = await fetch(`${port}/test`);
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  }catch(error) {
    console.log("error", error);
  }
};

//Setup header
import header from './image/header-logo.jpg'
var homeImg = document.getElementById('header');
homeImg.src = header;
testServer();




export {
  hndlDestinationSubmit, hndlDestDropDown, port, hndlDateSubmit
};
