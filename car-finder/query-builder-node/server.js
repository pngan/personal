'use strict';

const express = require('express');
const request = require('request');
const jsdom = require("jsdom");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Disable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var options = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    json: true
};
app.get('/', (req, resOuter) => {
  var make = (req.query.make !== undefined) ? req.query.make : 'a';
  var model =  (req.query.model !== undefined) ? req.query.model : '';
  var region =  (req.query.region !== undefined) ? req.query.region : '';
  var bodyStyle =  (req.query.bodyStyle !== undefined) ? req.query.bodyStyle : '';
  var tranmissionStyle =  (req.query.tranmissionStyle !== undefined) ? req.query.tranmissionStyle : '';



  options.url = `https://www.autotrader.co.nz/search-fields/listing?searchterm=${make},${model},${bodyStyle},${region},${tranmissionStyle},,`;
  request(options, (err, res, body) => {
    if (err) { return console.log(err); }

    resOuter.send(body);
  });
});


app.get('/find', (req, resOuter) => {


  if (req.query.json === undefined) {
    return;
  }
  var json = (req.query.json !== undefined) ? req.query.json : '';
  var options = {
    url: "https://www.autotrader.co.nz/used-cars-for-sale/"
  };

  for (let value of Object.values(JSON.parse(req.query.json))) {
    console.log(value);
    if (options.url.slice(-1) !== '/') {
      options.url += '-';
    }
    options.url += value;
  }
  console.log(options.url);
  request(options, (err, res, body) => {
    if (err) { return console.log(err); }

    const {JSDOM} = jsdom;
    const dom = new JSDOM(body);
    const $ = (require('jquery'))(dom.window);

    var items = $(".list-item");

    var results = '';

    for(var i = 0; i < items.length; i++) {
      var titleClass = $(items[i]).children('.title');
      var titleAnchor = $($(titleClass).find('a')[0]);
      var title = $(titleAnchor).html();
      var itemLink =  'https://www.autotrader.co.nz' + $(titleAnchor).attr('href');

      var thumbNailClass = $(items[i]).children('.thumbnail');
      var image = $($(thumbNailClass)[0]).html();

      // Url to cdn image
      var imageLink = 'http:' + $(image).attr('data-original');


      var priceClass = $(items[i]).children('.price');
      var price = $(priceClass).html();

      var featureClass = $(items[i]).children('.features');
      var mileage = $($($(featureClass)[0]).find('li')[0]).html();

      if (i > 0) {
        results += ", "
      }
      results += `{"title": "${title}", "price": "${price}", "mileage": "${mileage}", "itemLink": "${itemLink}", "imageLink": "${imageLink}" }`;

     // var movieYear = $($(innerInfo).find('.year_type')[0]).html();
      console.log(i + " -> " + title + ":" + price + ":" + mileage + ":" + itemLink + ":" + imageLink);
    }
    console.log(results);
    resOuter.send(`[${results}]`);
    // resOuter.send(body);
  });
});


app.get('/test', (req, resOuter) => {
  
  // if (req.query.json === undefined) {
  //   return;
  // }
  // var json = (req.query.json !== undefined) ? req.query.json : '';
  // var options = {
  //   url: "https://www.autotrader.co.nz/used-cars-for-sale/"
  // };
  // for (let value of Object.values(JSON.parse(req.query.json))) {
  //   console.log(value);
  //   if (options.url.slice(-1) !== '/') {
  //     options.url += '-';
  //   }
  //   options.url += value;
  // }

  resOuter.send('{"key1": "val1"}');
  // resOuter.send('{"key1": "val1"}');
    // resOuter.send(body);
});



// https://www.autotrader.co.nz/search-fields/listing?searchterm=bmw,116i,hatchback,auckland,tiptronic,, 
// https://www.autotrader.co.nz/used-cars-for-sale/toyota-convertible/price-2500-250000/year-1950-2000/kms-10000-200000
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);