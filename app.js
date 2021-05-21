const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require('dotenv/config');
require('./backend/passport')(passport);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Import Routes
const beerRoute = require('./backend/routes/beer');
const categoryRoute = require('./backend/routes/category');
const userRoute = require('./backend/routes/user');
const scoreRoute = require('./backend/routes/score');

app.use('/api/beer', beerRoute);
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoute);
app.use('/api/score', scoreRoute);


// ROUTES
app.get('/', (req, res) => {
  res.send('We are on home');
});


// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log('Connected to DB');
    }
  }
);

app.listen(3000);
