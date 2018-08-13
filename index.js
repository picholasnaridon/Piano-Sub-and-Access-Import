var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var apiRouter = require('./routes/apiRoutes')

var app = express();
var PORT = process.env.PORT || 3000


app.use(express.static('/public'));
app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');
app.set('views', './views')


app.use('/', apiRouter);



app.listen(PORT, () => {
  console.log("Started on port: ", PORT)
})