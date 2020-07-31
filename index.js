const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const cors = require('cors');
const keys = require('./config/key.json');
// const cloudinary = require('cloudinary').v2

// Import Routes
const userRoute = require('./routes/user');
const newsRoute = require('./routes/news');

const app = express();

// Connect to DB
mongoose.connect(keys.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, },
  () => {
    console.log('Connected to DB!');
  }
);

// Middleware
app.use(express.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Cloudinary Settings
// cloudinary.config({
//   cloud_name: "dt54gdtmn",
//   api_key: "548294752167976",
//   api_secret: "ZvTVqtTYyXWNAQpcy6tjU9rPLWk"
// })

// Routes Middlewares
app.use('/news', newsRoute);
app.use('/user', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening on 5000");
});