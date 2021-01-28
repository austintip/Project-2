require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const axios = require('axios');
const flash = require('connect-flash');
const helmet = require('helmet');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const app = express();
const API_KEY= process.env.API_KEY
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(helmet());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  let alerts = req.flash();
  console.log(alerts);
  res.locals.alerts = alerts;
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  let dogsUrl = "https://api.thedogapi.com/v1/breeds/"
  axios.get(dogsUrl)
  .then(apiResponse => {
    let dogs = apiResponse.data;
    dogs.forEach(dog => {
    });
    res.render('index', { dogs: dogs});
  })
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'", "https://*.TheDogapi.com"],
      "img-src": ["'self'", "https://*.TheDogapi.com"]
    },
  })
);

app.get('/search', (req, res) => {
  let dogUrl = `https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`
  axios.get(dogUrl, { 
      headers: {
          'x-api-key': `${API_KEY}`
  }})
  .then(apiResponse => {
      let dogs = apiResponse.data;
      console.log(dogs);
      res.render('index', { dogs: dogs });
  }).catch(err => {
      console.log(err)
      res.send(err)
  });
});

app.use('/mydogs', isLoggedIn, require('./routes/mydogs'));

app.use('/auth', require('./routes/auth'));

app.use('/info', require('./routes/info'));



var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;