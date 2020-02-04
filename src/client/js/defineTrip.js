import {port} from '../index.js';
let tripCount = 1;
const body = document.getElementById('body')
let tripArray = [];
const tripID = "trip" + tripCount;
// require("regenerator-runtime");

function createDestDropDown(geoNames) {
  // console.log(geoNames);

};

function hndlDestinationSubmit (event) {
  let formDestination = document.getElementById('destination').value;
  // let formStart = document.getElementById('start').value;
  // let formEnd = document.getElementById('end').value;
  // console.log(formDestination + ' ' + formStart + ' ' + formEnd);

  //Hide Input form

  //Create Location Dropdown
  const geoNames = getGeoNames(formDestination);
  .then(() => {
    console.log(geoNames);
    // createDestDropDown(geoNames);
    }
  )

};

const getGeoNames = async (Dest) => {
  const res = await fetch(`${port}/geonames/${Dest}`);
  // const res = await fetch(`${port}/geoNames/Marion`);
  try {
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
};

const testgetGeoNames = async (Dest) => {
  let URL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
  URL += Dest + '&username=bcaylor';
  // const User =
  // const res = await fetch(`URL + Dest + '&username=bcaylor'`);
  const res = await fetch(URL);
    // const res = await fetch(`${port}/geoNames/Marion`);
  try {
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
};

export { hndlDestinationSubmit };
