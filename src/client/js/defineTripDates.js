import {toggleElement, tripArray} from './defineTrip.js';
import {getWeather} from './getWeather.js';

function hndlDateSubmit (event) {
  event.preventDefault();
  let start = document.getElementById('startDate').value;
  let end = document.getElementById('endDate').value
  let tripLength = timeDiff(start, end);
  let timeTill = timeDiff(Date.now(), start);
  start = new Date(start);
  end = new Date(end);
  let arrayLoc = tripArray.length - 1
  let addDates = {
    postalCode: tripArray[arrayLoc].postalCode,
    placeName: tripArray[arrayLoc].placeName,
    adminName1: tripArray[arrayLoc].adminName1,
    countryCode: tripArray[arrayLoc].countryCode,
    lng: tripArray[arrayLoc].lng,
    lat: tripArray[arrayLoc].lat,
    start: start,
    end: end,
    numDays: tripLength,
  };
  tripArray.pop();
  tripArray.push(addDates);
  console.log(addDates);
  getWeather(tripArray, arrayLoc);
};


function timeDiff(start, end) {
  var startDate = new Date(start);
  var endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return diff/(1000*60*60*24);  //(1000*60*60*24) milliseconds in a day
};

export { hndlDateSubmit, timeDiff };
