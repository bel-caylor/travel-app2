// Global variables
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
  res.status(200).send('./dist/index.html');
})

app.get('/geoNames/:destination', async (req, res) => {
  const URL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
  console.log('Started GeoNames');
  console.log(req.params.destination);
  res = await fetch(URL + req.params.destination + '&username=bcaylor');
  try {
    const data = await res.json();
    console.log(data);
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
});
