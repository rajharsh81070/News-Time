const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB!');
  }
);

// Import Routes
const authRoute = require('./routes/auth');

// Middleware
app.use(express.json());

// Routes Middlewares
app.use('/user', authRoute);

app.listen(5000, () => {
  console.log("App listening on 5000");
})