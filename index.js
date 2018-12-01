
const express = require('express');
const app = express();
const dirPath = require('path');
const pg = require('pg');
const bodyParser = require("body-parser");
const config = require('./config');
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
  res.status(200).end("ok");
})

function insertData(data) {
  var flag = false;
  var pool = new pg.Pool(config.PG_CONFIG);
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    var rows = [];
    let sql = 'INSERT INTO contact_form(first_name, last_name, phone, email, message) VALUES($1, $2, $3, $4, $5)';
    client.query(sql,
      [
        data.first_name,
        data.last_name,
        data.phone,
        data.email,
        data.message
      ], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result.rows[0]);
          flag = true;
        };
      });
  });
  pool.end();
  return flag;
}
