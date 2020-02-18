# Travel Application

## Description
This application will take your destination and travel dates, and return the
number of days until you travel along with the forecasted weather.

## Install
clone travel-app2

To run code you will need to obtain API keys for:
- DarkSky - https://darksky.net/dev/register
- Pixabay - https://pixabay.com/

Create .env file at the root.
`DARK_SKY_API_KEY=*****************************
 PIXABAY_API_KEY=******************************`

## Improvements
- Update logo photo - reduce size of watch and height of logo
- Split html grid into div tripInfo and div weather
- Size trip font to fill grid
- Create 3 media sizes for forecast (7 Day ForeCast)
  - small icon on top of weather details in one column
  - medium icon in left column - weather detail in right column
  - large 7 column weather details'
- Create geoname summary Array.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  -test if copy in array
  -splice
  -unshift - to put new item at front
