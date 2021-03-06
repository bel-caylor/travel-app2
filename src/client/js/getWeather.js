import samplePht from '../image/samplePhoto.jpg'
import clearDay from '../image/weather-icons/clear-day.jpg'
import clearNight from '../image/weather-icons/clear-night.jpg'
import cloudy from '../image/weather-icons/cloudy.jpg'
import fog from '../image/weather-icons/fog.jpg'
import partlyCloudyDay from '../image/weather-icons/partly-cloudy-day.jpg'
import partlyCloudyNight from '../image/weather-icons/partly-cloudy-night.jpg'
import rain from '../image/weather-icons/rain.jpg'
import sleet from '../image/weather-icons/sleet.jpg'
import snow from '../image/weather-icons/snow.jpg'
import thunderstorm from '../image/weather-icons/thunderstorm.jpg'
import wind from '../image/weather-icons/wind.jpg'
import {port} from '../index.js';
import {toggleElement, tripArray} from './defineTrip.js';
import {timeDiff} from './timeDiff.js';
import {convertTimeStamp} from './convertTimeStamp.js';
// import header from '../image/header-logo.jpg'
let weatherData = {};
require("regenerator-runtime");

const getWeather = async (tripArray, arrayLoc) => {
  //If the trip is within the next week return 7-Day forcast and an extra day for historical data.
  let nowDate = new Date();
  let startDiff = timeDiff(nowDate, tripArray[arrayLoc].start)
  let endDiff = timeDiff(nowDate, tripArray[arrayLoc].end)
  let startDate = new Date();
  let tripLength = 10
  if ((startDiff < 0 || startDiff > 8) && (endDiff < 0 || endDiff > 8)) {
    startDate = new Date(tripArray[arrayLoc].start);
    tripLength = tripArray[arrayLoc].numDays
  };
  const res = await fetch(`${port}/getWeather/${tripArray[arrayLoc].lat}/${tripArray[arrayLoc].lng}/${startDate}/${tripLength}`)
  try {
    weatherData = await res.json();
    console.log(weatherData);
    resultsHTML(tripArray[arrayLoc], weatherData, arrayLoc);
  }
  catch(error) {
    console.log("error", error);
  }
};

function resultsHTML(tripArray, weatherData, arrayLoc) {
//ADD section
  let HTMLresults = `<div id=\"trip${arrayLoc}\" class=\"resultLayout results trip label\">`
  HTMLresults += `<div class=\"tripInfo\"><div id=\"photo${arrayLoc}\" class=\"locationPhoto tripImage\">`
  HTMLresults += `<img id=\"img${arrayLoc}\"></div>`
  HTMLresults += `<div id=\"tripDetails${arrayLoc}\" class=\"tripDetails\"></div></div>`
  HTMLresults += `<div id=\"forecast${arrayLoc}\" class="forecast"></div>`
  HTMLresults += `<form id=\"delTrip${arrayLoc}\" onsubmit=\"return Client.hndlDeleteTrip(event, ${arrayLoc})\" class=\"deleteButton\">`
  HTMLresults += `<button id=\"deleteTrip${arrayLoc}\" type = \"submit\"  onclick=\"return Client.hndlDeleteTrip(event, ${arrayLoc})\"> `
  HTMLresults += `Delete Trip </button></form></div>`

  document.getElementById('results').insertAdjacentHTML('beforeend', HTMLresults);

//ADD Trip tripDetails
  let start = tripArray.start.toString()
  let end = tripArray.end.toString()
  let startIn = Math.ceil(timeDiff(Date.now(), tripArray.start))
  document.getElementById(`img${arrayLoc}`).src = tripArray.photo;
  let tripSection = `<div class=\"destination\">${tripArray.placeName}, ${tripArray.adminName1}, ${tripArray.countryCode}</div>`
  tripSection += `<div class=\"travelDates\">From ${start.slice(0,10)} to ${end.slice(0,10)}</div>`
  //Add Trip Start In:
  if (startIn > 0) {
    tripSection += `<div class=\"info\">Trip Start In: ${startIn} Days</div>`
  }
  //Add Historical Data
  if (startIn < 0 || startIn > 7) {
    tripSection += `<div class=\"info\">Historical HIGH Temp: ${weatherData[0].temperatureHigh}</div>`
    tripSection += `<div class=\"info\">Historical LOW Temp: ${weatherData[0].temperatureLow}</div>`
  }
  tripSection += `<br>`
  document.getElementById(`tripDetails${arrayLoc}`).innerHTML = tripSection

//ADD forecastweather data
  if (startIn > -1 && startIn < 8) {
    // let weatherHTML = ``;
    let weatherHTML = `<div class=\"forecastLabel label\">FORECAST</div>`;
    let count = 1;
    weatherData.forEach((date) => {
      let newDate = new Date(date.time*1000)
      let timeDifference = Math.ceil(timeDiff(Date.now(), newDate))

      if (timeDifference >= 0 && timeDifference < 7) {
        let Icon = weatherIcon(date.icon);
        weatherHTML += `<div id=\"day${count}\" class=\"day\">`;
        weatherHTML += `<div class=\"weatherIcon\"><img class=\"icon\" src=\"${Icon}\"></div>`;
        weatherHTML += `<div class=\"weatherDate\">${convertTimeStamp(date.time)}</div>`;
        weatherHTML += `<div class=\"weatherDetail\"><div class=\"temp\">Low: ${Math.round(date.temperatureLow)}&#8457</div>`;
        weatherHTML += `<div class=\"temp\">High: ${Math.round(date.temperatureHigh)}&#8457</div>`;
        weatherHTML += `<div class=\"summary\">${date.summary}</div></div></div>`;
      }
        count = count + 1
    });
    // weatherHTML += `</div>`;
    document.getElementById(`forecast${arrayLoc}`).innerHTML = weatherHTML;
  }
};

function weatherIcon(icon) {
  let photo = ""
  switch (icon) {
    case "clear-day":
      return "e1469de5d450439b00459b305d6d6037.jpg";
    case "clear-night":
      return "4c6bc2b0a89bad212b35a34283b5435d.jpg";
    case "cloudy":
      return "bddb3aaab2d942a0f16e0686e3aeac8a.jpg";
    case "fog":
      return "4d068580276242ed8333cd381972e901.jpg";
    case "partly-cloudy-day":
      return "ea8ac1f59f9aed68ee98c3a5248de625.jpg";
    case "partly-cloudy-night":
      return "09920f87dd106e8857f77dd35b58da32.jpg";
    case "rain":
      return "44ca66866f7882db7ce6eed7564a3c6d.jpg";
    case "sleet":
      return "ad11638f26aa5dcd79c83ecefe43b1b4.jpg";
    case "snow":
      return "999a32e275cf9a6ccf19e47a6e44e96f.jpg";
    case "thunderstorm":
      return "a66d6c218eda57c60b7d088a561b604b.jpg";
    case "wind":
      return "6754f0ce4d38eb582769524f8f48b403.jpg";
  };
};

export { getWeather };
