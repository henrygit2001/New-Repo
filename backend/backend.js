const express = require('express');
const flightScanner = require('skiplagged-node-api');
const app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
var prices;
var brands;
var resp = [];
var results_Count = 5;
var From = 'SEA';
var To = 'LAX';
var departure_Date = '2022-10-10';

var searchOptions = {
  from: From,
  to: To,
  departureDate: departure_Date,
  resultsCount: results_Count,
  partialTrips: false,
};

async function Flight_Scan() {
  await flightScanner(searchOptions)
    .then((response) => {
      // console.log(response);
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
    }).catch((err) => (resp = err));
}
app.post('/', async function(req,res){
  await Flight_Scan();
  res.send(resp);
}
app.post('/data', urlencodedParser, async function (req, res) {
  searchOptions.resultsCount = Number(req.body.Results_Count);
  searchOptions.from= String(req.body.From);
  searchOptions.to= String(req.body.To);
  searchOptions.departureDate= String(req.body.Departure_date);
  await Flight_Scan();
});
app.get('/', function (req, res) {
  await Flight_Scan();
  res.send(resp);
});
app.listen(port);
