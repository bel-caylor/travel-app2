// Global variables
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const testServerData = require('./testServer.js')
const fetch = require("node-fetch");

// Setup port
const port = 3000;
app.listen(port, () => {
  console.log(`Server Running on PORT ${port}`);
});

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Cors
app.use(cors());

//Location of webpack files
app.use(express.static('./dist'));

//Routes
//Test Route
app.get('/test', function (req, res) {
    console.log('Server Test');
    res.send(testServerData);
});

app.get('/', (req, res) => {
	res.send('../../../dist/index.html');
});

//Callback functions
const getGeoNames = async (req, res) => {
    const URL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
    console.log('Started GeoNames');
    console.log(req.params.destination);
    const response = await fetch(URL + req.params.destination + '&username=bcaylor')
    try {
      const data = await response.json()
      console.log(data)
      return data;
    }
    catch(error) {
      console.log("error", error)
    }
    res.send(response)
};

app.get('/geoNames/:destination', async (req, res) => {
  const URL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
  console.log('Started GeoNames');
  console.log(req.params.destination);
  const response = await fetch(URL + req.params.destination + '&username=bcaylor')
  try {
    const data = await response.json()
    console.log(data)
    // return data;
    res.send(data)
  }
  catch(error) {
    console.log("error", error)
  }

});

app.get('/getWeather/:latitude/:longitude/:startDate/:tripLength', async (req,res) => {
  let weatherData = [];
  const URL = 'https://api.darksky.net/forecast/';
  const key = process.env.DARK_SKY_API_KEY;
  // const start =
  console.log('Started getWeather');
  let timestamp = new Date(req.params.startDate).getTime()/1000.0;
//loop through travel dates
  // console.log(req.params.tripLength);
  for(var i = 0; i < req.params.tripLength; i++) {
    // const darkSkyURL = URL + key + "/" + req.params.latitude + "," + req.params.longitude + ","  + timestamp + "?exclude=currently,minutely,hourly,flags,alerts";
    // console.log(darkSkyURL);
    const response =  await fetch(URL + key + "/" + req.params.latitude + "," + req.params.longitude + ","  + timestamp + "?exclude=currently,minutely,hourly,flags,alerts")
    try {
      const data = await response.json()
      // console.log(data)
      let dataPoint = {
        time: timestamp,
        summary: data.daily.data[0].summary,
        icon: data.daily.data[0].icon,
        temperatureHigh: data.daily.data[0].temperatureHigh,
        temperatureLow: data.daily.data[0].temperatureLow
      };
      weatherData.push(dataPoint);
      timestamp += (60*60*24);
    }
    catch(error) {
      console.log("error", error)
    }
  };
  console.log(weatherData)
  res.send(weatherData)
});

app.get('/getPhoto/:placeName/:state/:country', async (req,res) => {
  const URL = 'https://pixabay.com/api/?key=';
  const key = process.env.PIXABAY_API_KEY;
  let response =  await fetch(URL + key + "&q=" + req.params.placeName + "+" + req.params.state + "&image_type=photo&category=travel")
  try {
    let data = await response.json()
    console.log(data.total)
    if (data.total === 0) {
      response =  await fetch(URL + key + "&q=" + req.params.state + "&image_type=photo&category=travel")
      data = await response.json()
    }
    res.send(data)
  }
  catch(error) {
    console.log("error", error)
  }
});
