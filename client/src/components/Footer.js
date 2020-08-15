import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="inherit" >
//       {'Copyright © '}
//       <Link color="inherit" href="https://rajharsh81070.github.io/My-Portfolio/">
//         Harsh Raj
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // minHeight: '60vh',
  },
  footer: {
    padding: '3px 24px 36px',
    width: '100%',
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
  },
  contain: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    },
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container className={classes.contain} maxWidth="lg">
          <div style={{ textAlignLast: 'end', fontSize: 'large', padding: '3px 0px 63px ' }}>
            <p style={{ marginBottom: '9px' }} >You can follow me on:</p>
            <a
              target="_blank"
              style={{ margin: '15px' }}
              rel="noopener noreferrer"
              href="https://github.com/rajharsh81070"
              aria-label="My github"
            >
              <i
                className="fab fa-2x fa-github"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/harsh-raj-930427164/"
              aria-label="My Linkedin"
            >
              <i class="fab fa-2x fa-linkedin"></i>
            </a>
          </div>
          <div style={{ textAlignLast: 'center', fontSize: 'large' }}>
            <i className="fas fa-code"></i> with <i className="fas fa-heart"></i> and <i class="fas fa-coffee"></i> by{" "}
            <a
              className="badge badge-dark"
              target="_blank"
              rel="noopener noreferrer"
              href="https://rajharsh81070.github.io/My-Portfolio/"
              aria-label="My Personal Website"
            >
              <strong>
                Harsh Raj
              </strong>
            </a>{" "}
      using <i className="fab fa-react"></i> {" & "}
            <i class="fab fa-node-js"></i>
          </div>
        </Container>
      </footer>
    </div >
  );
}