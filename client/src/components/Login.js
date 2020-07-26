import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import * as userActions from '../actions/userActions';
import { toast } from 'react-toastify';
import userStore from '../stores/userStore';
import NavBar from './NavBar';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
}));

function Login(props) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(userStore.isAuthenticated());

  useEffect(() => {
    userStore.addChangeListener(onChange);
    if (isAuthenticated === true) {
      props.history.push('/');
      toast.success('Login Successful');
    }
    if (!isSuccess && isValid) {
      toast.error(errors);
    }
    return () => userStore.removeChangeListener(onChange);
  }, [isSuccess, isValid, props.history, errors, isAuthenticated])

  function onChange() {
    const data = userStore.getErrors();
    setIsAuthenticated(userStore.isAuthenticated());
    if (data.hasOwnProperty('errors'))
      setErrors(data.errors);
    if (data.hasOwnProperty('isValid'))
      setIsValid(data.isValid);
    if (data.hasOwnProperty('success'))
      setIsSuccess(data.success);
  }

  function handleFormChange(event) {
    event.preventDefault();
    const { target } = event;
    const updateData = { ...user, [target.name]: target.value };
    const updateErrorData = { ...errors, [target.name]: "" };
    setErrors(updateErrorData);
    setUser(updateData);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    debugger;
    userActions.loginUser(user);
  }

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container style={{ paddingTop: '90px', paddingBlockEnd: '381px' }} component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form onChange={handleFormChange} onSubmit={handleFormSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={8}>
        <Copyright />
      </Box> */}
      </Container >
    </>
  );
}

export default Login;