
const express = require('express');
const app = express();
const dirPath = require('path');
const pg = require('pg');
const bodyParser = require("body-parser");

var pgp = require('pg-promise')
var db = pgp(process.env.DATABASE_URL)

pg.defaults.ssl = true;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.set('views', dirPath.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

// local server started at http://localhost:3000
app.listen(port, (err) => { console.log('connected!!') });



// index.html
app.get('/', function (req, res) {
  res.render('home');
})

app.post('/contact', function (req, res) {
  console.log("request body")
  console.log(req.body)
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var phone = req.body.phone;
  var email = req.body.email;
  var message = req.body.message;

  console.log("first name = " + first_name);
  console.log("last name = " + last_name);
  console.log("phone = " + phone);
  console.log("email = " + email);
  console.log("message = " + message);
  var data = insertData(req.body);
  console.log("data -- ", data)
  if (data) {
    res.status(200).end("ok");
  } else {
    res.status(200).end("error");
  }
})

function insertData(data) {
  db.one('INSERT INTO contact_form(first_name, last_name, phone, email, message) VALUES($1, $2, $3, $4, $5) RETURNING id', [data.first_name, data.last_name, data.phone, data.email, data.message])
    .then(data => {
      console.log(data.id); // print new user id;
      return true;
    })
    .catch(error => {
      console.log('ERROR:', error); // print error;
      return false;
    });
}
