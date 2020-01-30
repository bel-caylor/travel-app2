import {port} from '../index.js';
let tripCount = 1;
const body = document.getElementById('body')
let tripArray = [];
const tripID = "trip" + tripCount;

const getGeoNames = async() => {
  await fetch(`${port}/geonames/${formDestination}`)
  try {
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
};

function createDestDropDown(geoNames) {
  console.log(geoNames);

};

function hndlDestinationSubmit (event) {
  let formDestination = document.getElementById('destination').value;
  let formStart = document.getElementById('start').value;
  let formEnd = document.getElementById('end').value;
  console.log(formDestination + ' ' + formStart + ' ' + formEnd);

  //Hide Input form

  //Create Location Dropdown
  createDestDropDown(getGeoNames);
};

export {hndlDestinationSubmit};
