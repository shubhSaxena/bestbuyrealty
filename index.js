
const express = require('express');
const app = express();
const dirPath = require('path');
const pg = require('pg');
pg.defaults.ssl = true;

// app.set('views', dirPath.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

// local server started at http://localhost:3000
app.listen(port, (err) => { console.log('connected!!') });



// index.html
app.get('/', function (req, res) {
  res.render('home')
})

// app.post('/contact', function (req, res){

// })