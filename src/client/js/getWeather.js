import {port} from '../index.js';
import {toggleElement, tripArray} from './defineTrip.js';
let weatherData = {};

const getWeather = async (tripArray, arrayLoc) => {
  const res = await fetch(`${port}/getWeather/${tripArray[arrayLoc].lat}/${tripArray[arrayLoc].lng}/${tripArray[arrayLoc].start}/${tripArray[arrayLoc].numDays}`)
  try {
    weatherData = await res.json();
    console.log(weatherData);
    resultsHTML(weatherData);
  }
  catch(error) {
    console.log("error", error);
  }
};

// function cnvtDateToUnixTime(time) {
//
// };
//
// function cnvtUnixTimeToDate(timestamp) {
//
// };

function resultsHTML(weatherData) {

};

export { getWeather };
