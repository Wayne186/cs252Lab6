var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var url = require('url');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'js'))

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.render('index');
});

var pg = require('pg');


app.get('/db', function (request, response) {
	console.log(request);
	console.log(response);
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

var data;
app.post('/submitForm', function (request, response) {
	data = request.body.username;
	console.log(data);
	console.log(process.env.DATABASE_URL);
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
       	console.log(data);
    	client.query('insert into users values(' + data + ');', function(err, result) {
      	done();
      	if (err)
       		{ console.error(err); response.send("Error " + err); }
    	});
  	});
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


