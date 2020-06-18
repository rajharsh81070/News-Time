const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  // Check if the email is already registered.
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already Exists!');

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a New User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    // console.log(savedUser);
    res.send({ id: user._id });
  } catch (err) {
    // console.log(err);
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // Check if the user is already registered.
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password is wrong");

  // Password is Correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or Password is wrong");

  // Create and assign a token.
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('token', token).send(token);
});


module.exports = router;