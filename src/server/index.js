// Global variables
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const testServerData = require('./testServer.js')
const fetch = require("node-fetch");
let weatherData = [];

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

app.get('/getWeather/:latitude/:longitude/:startDate/:endDate', async (req,res) => {
  const URL = 'https://api.darksky.net/forecast/';
  const key = process.env.DARK_SKY_API_KEY;
  // const start = 
  console.log('Started getWeather');

//loop through travel dates

    const response =  await fetch(URL + key + "/" + req.params.latitude + "," + req.params.longitude + ","  + timestamp)
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
