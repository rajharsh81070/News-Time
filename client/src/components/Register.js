import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import * as userActions from "../actions/userActions";
import { toast } from 'react-toastify';
import userStore from '../stores/userStore';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register(props) {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    debugger;
    userStore.addChangeListener(onChange);
    if (isSuccess) {
      props.history.push('/login');
      toast.success(message);
    }
    if (!isSuccess && isValid) {
      toast.error(errors);
    }
    return () => userStore.removeChangeListener(onChange);
  }, [isSuccess, isValid, props.history, message])

  function onChange() {
    const data = userStore.getErrors();
    if (data.hasOwnProperty('errors'))
      setErrors(data.errors);
    if (data.hasOwnProperty('message'))
      setMessage(data.message);
    setIsValid(data.isValid);
    setIsSuccess(data.success);
  }

  function handleChange(event) {
    event.preventDefault();
    const { target } = event;
    const updateData = { ...user, [target.name]: target.value };
    const updateErrorData = { ...errors, [target.name]: "" };
    setErrors(updateErrorData);
    setUser(updateData);
  }

  function handleSubmit(event) {
    debugger;
    event.preventDefault();
    userActions.registerUser(user);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onChange={handleChange} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={(!errors.hasOwnProperty('firstName') || errors.firstName.length === 0) ? false : true}
                helperText={errors.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required={true}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                error={(!errors.hasOwnProperty('lastName') || errors.lastName.length === 0) ? false : true}
                helperText={errors.lastName}
                required={true}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={(!errors.hasOwnProperty('email') || errors.email.length === 0) ? false : true}
                helperText={errors.email}
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                error={(!errors.hasOwnProperty('password') || errors.password.length === 0) ? false : true}
                helperText={errors.password}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={(!errors.hasOwnProperty('confirmPassword') || errors.confirmPassword.length === 0) ? false : true}
                helperText={errors.confirmPassword}
                variant="outlined"
                required={true}
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;