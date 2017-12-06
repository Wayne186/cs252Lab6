var express = require('express');
var app = express();
var path = require('path')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'js'))

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'views')))

app.get('/', function(request, response) {
  response.render('index')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
