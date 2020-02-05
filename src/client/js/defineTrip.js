import {port} from '../index.js';
let tripCount = 1;
const body = document.getElementById('body')
let tripArray = [];
const tripID = "trip" + tripCount;
const testGeoNamesData = require('./sampleGeoNamesData.js');
require("regenerator-runtime");
const fetch = require("node-fetch");

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
  let formDestination = document.getElementById('formDest').value;
  const geoNames = getGeoNames(formDestination);
    //****TRYING TO GET .THEN TO WORK****
    // .then(() => {
    //   console.log(geoNames);
    //   createDestDropDown(testGeoNamesData, formDestination);
    //   }
    // )


  // let formStart = document.getElementById('start').value;
  // let formEnd = document.getElementById('end').value;
  // console.log(formDestination + ' ' + formStart + ' ' + formEnd);

  //Hide Input form


};

const getGeoNames = async (Dest) => {
  const res = await fetch(`${port}/geonames/${Dest}`);
  //***TRYING TO GET TRY to work after ASYNC call****
  try {
    const data = await res.json();
    //Need to change after I figure out .then
    createDestDropDown(data, formDestination);
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
};

function toggleElement(ID) {
  let elementID = document.getElementById(ID);
  if (elementID.style.display === "none") {
    elementID.style.display = "block";
  } else {
    elementID.style.display = "none";
  }
};

// module.exports = hndlDestinationSubmit
export { hndlDestinationSubmit };
