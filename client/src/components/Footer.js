import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing.unit * 27,
    width: theme.spacing.unit
    // padding: `${theme.spacing.unit * 1}px 0`,
  }
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.footer} position="static" color="primary">
      <Container maxWidth="100%">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy; 2019 Gistia
          </Typography>
        </Toolbar>
      </Container>
    </AppBar >
  );
}

export default Footer;