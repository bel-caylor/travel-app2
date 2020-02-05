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
  const location = geoNames.postalCodes;
  console.log(location);
// Remove duplicate places and populate placeNames with unique places.
  location.forEach((postalCodes) => {
    if (formDestination === postalCodes.placeName) {
      let newEntry = {
        postalCode: postalCodes.postalCode,
        placeName: postalCodes.placeName,
        adminName1: postalCodes.adminName1,
        countryCode: postalCodes.countryCode,
        lng: postalCodes.lng,
        lat: postalCodes.lat
      };

      if (placeNames.length === 0) {
        placeNames.push(newEntry);
      }else{
        for (const place of placeNames) {
          if (location.adminName1 === place.adminName1) {
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
//Update UI
  toggleElement('destination');
  //If there is multiple locations toggle dropdown form else toggle dates form.
  if (placeNames.length > 1) {
    let dropDownHTML = `<select>`
    for (const loc of placeNames) {
      dropDownHTML += `<option value=\"${loc.postalCode}\">${loc.placeName}, ${loc.adminName1}, ${loc.countryCode}</option>`

    }

    // placeNames.forEach(
    // );
    dropDownHTML += `</select>`;
    document.getElementById('destDropDown').insertAdjacentHTML('afterbegin', dropDownHTML);
    toggleElement('destDropDown');
  }else{
    toggleElement('dates');
  }
};

function hndlDestinationSubmit (event) {
  event.preventDefault()
  let formDestination = document.getElementById('formDest').value;
  createDestDropDown(testGeoNamesData, 'Wagner')
};

//TESTING ASYNC ON client side.
// const data = testgetGeoNames(formDestination)
// .then(() => {
//   createDestDropDown(data, formDestination)
//   }
// );


//****TRYING TO GET .THEN TO WORK****
    // const geoNames = getGeoNames(formDestination);

    // .then(() => {
    //   console.log(geoNames);
    //   createDestDropDown(testGeoNamesData, formDestination);
    //   }
    // )


  // let formStart = document.getElementById('start').value;
  // let formEnd = document.getElementById('end').value;
  // console.log(formDestination + ' ' + formStart + ' ' + formEnd);

  //Hide Input form




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

const testgetGeoNames = async (Dest) => {
  let URL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
  URL += Dest + '&username=bcaylor';
  // const User =
  // const res = await fetch(`URL + Dest + '&username=bcaylor'`);
  const res = await fetch(URL);
    // const res = await fetch(`${port}/geoNames/Marion`);
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

// module.exports = hndlDestinationSubmit
export { hndlDestinationSubmit };
