const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// User Model
const User = require('../model/User');

// Input Validation
const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

router.post('/register', async (req, res) => {
  // Form Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if the email is already registered.
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ email: 'Email already Exists!' });

  // Hash Password
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a New User
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    // await user.save();
    const newUser = await user.save();
    console.log(newUser);
    res.status(200).json({ success: true });
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  // Form Validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if the user is already registered.
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Email or Password is wrong");

  // Password is Correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Email or Password is wrong");

  // Create JWT Payload
  const payload = {
    id: user._id
  };

  // Assign a token.
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 31556926 });
  // res.json(token);
  res.header('token', token).json(
    {
      success: true,
      token: "Bearer " + token
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({ success: true });
  })



module.exports = router;