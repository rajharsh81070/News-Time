import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
// import { ShareButtons } from 'react-share';
// const {

// } = ShareButtons;
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography style={{
        fontSize: '15px',
        padding: '10px 30px 0px 0px',
        alignContent: 'center'
      }} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    display: 'grid',
    padding: theme.spacing(2),
    justifyContent: 'center'
  },
}))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

function ShareModal(props) {
  const [open] = React.useState(props.open);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };


  return (
    <div>
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography style={{ paddingLeft: '72px', paddingBottom: '20px' }} gutterBottom>
            Share this via
          </Typography>
          <Typography gutterBottom>
            <FacebookShareButton
              url={props.url}
              title={"Facebook"}
              style={{ paddingRight: '28px' }}
            >
              <FacebookIcon size={54} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={props.url}
              title={"Twitter"}
              style={{ paddingRight: '30px' }}
            >
              <TwitterIcon
                size={54}
                round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={props.url}
              title={"WhatsApp"}
              style={{ paddingRight: '2px' }}>
              <WhatsappIcon url={props.url} size={54} round={true} />
            </WhatsappShareButton>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ShareModal;