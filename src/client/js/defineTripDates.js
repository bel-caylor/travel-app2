import {toggleElement, tripArray} from './defineTrip.js';

function hndlDateSubmit (event) {
  event.preventDefault();
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value
  const numDays = numberOfDays(start, end);
  let arrayLoc = tripArray.length - 1
  let addDates = {
    postalCode: tripArray[arrayLoc].postalCode.value,
    placeName: tripArray[arrayLoc].placeName,
    adminName1: tripArray[arrayLoc].adminName1,
    countryCode: tripArray[arrayLoc].countryCode,
    lng: tripArray[arrayLoc].lng,
    lat: tripArray[arrayLoc].lat,
    start: start,
    end: end,
    numDays: numDays,
  };

  tripArray.push(addDates);
};


function numberOfDays(start, end) {
  var startDate = new Date(start);
  var endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return diff/(1000*60*60*24);  //(1000*60*60*24) milliseconds in a day
};

export { hndlDateSubmit, numberOfDays };
