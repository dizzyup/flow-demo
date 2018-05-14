var express = require('express');
var app = express();

require('dotenv').config()

app.set('port', (process.env.PORT || 5001));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(express.static('public/images'))

app.get('/', function(request, response) {
  var env = process.env.APP_ENV;
  if (env == 'staging') {
    var envName = 'staging'
  } else if (env == 'production') {
    var envName = 'production'
  } else if (env == 'review') {
    var envName = 'review app'
  } else {
    var envName = 'local'
  }
  response.render('index.html', { env: envName});
});

app.listen(app.get('port'), function() {
  console.log("Node app running at http://localhost:" + app.get('port'));
});

module.exports = app
