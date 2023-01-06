// index.js
// where your node app starts

// init project
var express = require('express');
const timestamp = require('unix-timestamp');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/", function (req, res) {
  res.json({ 'unix': timestamp.now() * 1000, 'utc': new Date(timestamp.now() * 1000).toUTCString()});
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// request api date with unix key
app.get("/api/:date", function (req, res) {
  const numberRegex =  /^\d+$/;
  const time = new Date(req.params.date).toUTCString();
  
  if (time == 'Invalid Date' && numberRegex.test(req.params.date) == false) {res.json({ error : "Invalid Date" })};

  numberRegex.test(req.params.date) == true ? 
  res.json({ 'unix': parseInt(req.params.date), 'utc': new Date(timestamp.toDate(parseInt(req.params.date / 1000))).toUTCString()}) :
  res.json({ 'unix': timestamp.fromDate(time) * 1000, 'utc': time});
}); 



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
