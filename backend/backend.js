const express = require('express');
const flightScanner = require('skiplagged-node-api');
const app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let port = process.env.PORT || 5000;
let prices;
let brands;
let resp = [];
let results_Count = 5;
let From = 'SEA';
let To = 'LAX';
let departure_Date = '2022-10-10';

var searchOptions = {
  from: From,
  to: To,
  departureDate: departure_Date,
  resultsCount: results_Count,
  partialTrips: true,
};

async function Flight_Scan() {
  flightScanner(searchOptions)
    .then((response) => {
      console.log(response);
      resp = [];
      brands = response.map((object) =>
        object.legs.map((object) => object.airline)
      );
      duration = response.map((object) => object.duration);
      price = response.map((object) => object.price);
      timeofFlight = response.map(
        (object) =>
          `${object.departureTime}=>${
            object.legs[object.legs.length - 1].arrivalTime
          }`
      );
      resp.push(
        brands,
        price,
        duration,
        timeofFlight,
        searchOptions.resultsCount
      );
    })
    .catch((err) => (resp = err));
}
app.post('/data', async function (req, res) {
  searchOptions.resultsCount = Number(req.body.Results_Count);
  searchOptions.from = String(req.body.From);
  searchOptions.to = String(req.body.To);
  searchOptions.departureDate = String(req.body.Departure_date);
  await Flight_Scan();
});
app.get('/', function (req, res) {
  console.log(resp)
  res.send("[
  [
    [ 'Spirit Airlines', 'Spirit Airlines' ],
    [ 'Spirit Airlines', 'Spirit Airlines' ],
    [ 'Spirit Airlines', 'Spirit Airlines' ],
    [ 'Spirit Airlines', 'Spirit Airlines' ],
    [ 'Alaska Airlines', 'Alaska Airlines' ],
    [ 'Alaska Airlines', 'Alaska Airlines' ],
    [ 'Alaska Airlines', 'Alaska Airlines' ],
    [ 'Alaska Airlines', 'Alaska Airlines' ],
    [ 'Alaska Airlines', 'Alaska Airlines' ],
    [ 'Alaska Airlines', 'Alaska Airlines' ],
    [ 'Alaska Airlines', 'Alaska Airlines' ],
    [ 'Alaska Airlines', 'Alaska Airlines' ]
  ],
  [
    '$152.00', '$152.00',
    '$152.00', '$152.00',
    '$208.00', '$208.00',
    '$208.00', '$208.00',
    '$208.00', '$208.00',
    '$208.00', '$208.00'
  ],
  [
    '4 Hours 40 Minutes',
    '7 Hours 1 Minute',
    '9 Hours 22 Minutes',
    '11 Hours 20 Minutes',
    '9 Hours 35 Minutes',
    '11 Hours 50 Minutes',
    '14 Hours 25 Minutes',
    '13 Hours 35 Minutes',
    '14 Hours 12 Minutes',
    '16 Hours 27 Minutes',
    '16 Hours 50 Minutes',
    '18 Hours 12 Minutes'
  ],
  [
    'Friday, August 26th 2022, 06:45pm=>Friday, August 26th 2022, 11:25pm',
    'Friday, August 26th 2022, 04:24pm=>Friday, August 26th 2022, 11:25pm',
    'Friday, August 26th 2022, 02:03pm=>Friday, August 26th 2022, 11:25pm',
    'Friday, August 26th 2022, 12:05pm=>Friday, August 26th 2022, 11:25pm',
    'Friday, August 26th 2022, 11:00pm=>Saturday, August 27th 2022, 08:35am',
    'Friday, August 26th 2022, 08:45pm=>Saturday, August 27th 2022, 08:35am',
    'Friday, August 26th 2022, 06:10pm=>Saturday, August 27th 2022, 08:35am',
    'Friday, August 26th 2022, 07:00pm=>Saturday, August 27th 2022, 08:35am',
    'Friday, August 26th 2022, 11:00pm=>Saturday, August 27th 2022, 01:12pm',
    'Friday, August 26th 2022, 08:45pm=>Saturday, August 27th 2022, 01:12pm',
    'Friday, August 26th 2022, 11:00pm=>Saturday, August 27th 2022, 03:50pm',
    'Friday, August 26th 2022, 07:00pm=>Saturday, August 27th 2022, 01:12pm'
  ],
  12
]");
});
app.listen(port, () => console.log('listening on: ' + port));
