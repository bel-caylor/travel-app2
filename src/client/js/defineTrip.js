require("regenerator-runtime");
import {port} from '../index.js';
import {tripDates} from './defineTripDates.js';
const body = document.getElementById('body')
let tripArray = [];
// const tripID = "trip" + tripCount;
const testGeoNamesData = require('./sampleGeoNamesData.js');
require("regenerator-runtime");
const fetch = require("node-fetch");
let placeNames = [];
let geoNames = [];
let httpPhoto = "";

function hndlDestinationSubmit (event) {
  event.preventDefault()
  let formDestination = document.getElementById('formDest').value;
  getGeoNames(formDestination)
    .then(() => {
      if (geoNames.postalCodes.length == 0) {
        alert("Please enter a valid city.");
      }else{
        createDestDropDown(formDestination);
      }
    }
  )
  document.getElementById('formDest').value = "";
};

const getGeoNames = async (Dest) => {
  const res = await fetch(`${port}/geonames/${Dest}`)
  try {
    geoNames = await res.json();
  }
  catch(error) {
    console.log("error", error);
  }
};

function createDestDropDown(formDestination) {
  toggleElement('destination');
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
          if (postalCodes.adminName1 === place.adminName1) {
            break;
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

  //If there is multiple locations toggle dropdown form else toggle dates form.
  if (placeNames.length > 1) {
    // let dropDownHTML = `<select id="dropdownID">`
    let dropDownSelect = document.getElementById("dropdownID");
      for (const loc of placeNames) {
      var option = document.createElement("option");
      option.value = `${loc.postalCode}`;
      option.text = `${loc.placeName}, ${loc.adminName1}, ${loc.countryCode}`;
      dropDownSelect.add(option);
      // dropDownHTML += `<option value=\"${loc.postalCode}\">${loc.placeName}, ${loc.adminName1}, ${loc.countryCode}</option>`
    }
    // dropDownHTML += `</select>`;
    // document.getElementById('destDropDown').insertAdjacentHTML('afterbegin', dropDownHTML);
    toggleElement('destDropDown');
  }else{
    toggleElement('dates');
  }

};


function hndlDestDropDown (event) {
  event.preventDefault()
//Find selected lcoation in placeNames
    let postalCode = document.getElementById('dropdownID').value;
    for (const placeName of placeNames) {
      if (postalCode === placeName.postalCode) {
        getPhoto(placeName.placeName, placeName.adminName1, placeName.countryCode)
          .then(() => {
            let newEntry = {
              postalCode: postalCode,
              placeName: placeName.placeName,
              adminName1: placeName.adminName1,
              countryCode: placeName.countryCode,
              lng: placeName.lng,
              lat: placeName.lat,
              photo: httpPhoto
            };
            tripArray.push(newEntry);
            console.log(tripArray);
          })
      };
    };
    removeDropDown();
    // document.getElementById('dropdownID').remove()
    toggleElement('destDropDown');
    // let dateNow = new Date;
    // let formatNow = dateNow.getFullYear() + "-" + dateNow.getMonth() + "-" +
    // document.getElementById('startDate').value = Date.now()
    // document.getElementById('endDate').value = Date.now()
    toggleElement('dates');
    placeNames = [];
};

const getPhoto = async (place, state, country) => {
  const res = await fetch(`${port}/getPhoto/${place}/${state}/${country}`)
  try {
    let data = await res.json();
    console.log(data.hits[0].webformatURL)
    if (data.hits[0].webformatURL !== undefined) {
      httpPhoto = data.hits[0].webformatURL;
    }
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

function removeDropDown () {
  let x = document.getElementById("dropdownID")
  while (x.length > 0) {
    x.remove(0)
  }
};

const testgetGeoNames = async (Dest) => {
  let URL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
  URL += Dest + '&username=bcaylor';
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

export { hndlDestinationSubmit, hndlDestDropDown, toggleElement, tripArray };
