import {toggleElement, tripArray} from './defineTrip.js';
import {getWeather} from './getWeather.js';
import {timeDiff} from './timeDiff.js';

function hndlDateSubmit (event) {
  event.preventDefault();
  document.getElementById('dropdownID').remove()
  toggleElement('dates');
  let start = document.getElementById('startDate').value;
  let end = document.getElementById('endDate').value
  let tripLength = timeDiff(start, end);
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
    photo: tripArray[arrayLoc].photo,
    start: start,
    end: end,
    numDays: tripLength,
  };
  tripArray.pop();
  tripArray.push(addDates);
  console.log(addDates);
  getWeather(tripArray, arrayLoc)
    .then (() => {
// Clear form and toggle destination.
      document.getElementById('startDate').value = "";
      document.getElementById('endDate').value = "";
      toggleElement('destination');
      }
    );
};

export { hndlDateSubmit };
