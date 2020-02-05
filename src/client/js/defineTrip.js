import {port} from '../index.js';
let tripCount = 1;
const body = document.getElementById('body')
let tripArray = [];
const tripID = "trip" + tripCount;
const testGeoNamesData = require('./sampleGeoNamesData.js');
// require("regenerator-runtime");

function createDestDropDown(geoNames, formDestination) {
  let placeNames = [];
  // console.log(placeNames.length);
  const postalcode = geoNames.postalCodes;
  console.log(postalcode);

  postalcode.forEach((postalcode) => {
    if (formDestination === postalcode.placeName) {
      let newEntry = {
        placeName: postalcode.placeName,
        adminName1: postalcode.adminName1,
        countryCode: postalcode.countryCode,
        lng: postalcode.lng,
        lat: postalcode.lat
      };

      if (placeNames.length === 0) {
        placeNames.push(newEntry);
      }else{
        for (const place of placeNames) {
          if (postalcode.adminName1 === place.adminName1) {
            continue;
          }else{
            placeNames.push(newEntry);
            console.log(placeNames);
            break;
          };
        };
      };
    };

  });
  console.log(placeNames);
};

function hndlDestinationSubmit (event) {
  let formDestination = document.getElementById('destination').value;
  // const geoNames = getGeoNames(formDestination);
    // .then(() => {
    //   console.log(geoNames);
    //   // createDestDropDown(geoNames);
    //   }
    // )
  createDestDropDown(testGeoNamesData, formDestination);

  // let formStart = document.getElementById('start').value;
  // let formEnd = document.getElementById('end').value;
  // console.log(formDestination + ' ' + formStart + ' ' + formEnd);

  //Hide Input form

  //Create Location Dropdown




  // .then(() => {
  //   console.log(geoNames);
  //   // createDestDropDown(geoNames);
  //   }
  // )

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

function toggleElement(ID) {
  var x = document.getElementById(ID);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};

// module.exports = hndlDestinationSubmit
export { hndlDestinationSubmit };
