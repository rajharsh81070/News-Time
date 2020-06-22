const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require("passport");
const cors = require('cors');

// Import Routes
const authRoute = require('./routes/auth');
const newsRoute = require('./routes/news');

dotenv.config();

const app = express();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB!');
  }
);

// Middleware
app.use(express.json());
app.use(cors())

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes Middlewares
app.use('/', newsRoute);
app.use('/auth', authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening on 5000");
})