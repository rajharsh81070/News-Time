import React from 'react';
import {
  // makeStyles, 
  withStyles
} from '@material-ui/core/styles';
import {
  Divider,
} from "@material-ui/core";
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';


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
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function FormModal(props) {
  const { open, handleClose, handleChange, handleSubmit, setFormData, formData, setImage } = props;
  // const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="profile-dialog-title">
        <DialogTitle id="profile-dialog-title" onClose={handleClose}>
          Update Profile
        </DialogTitle>
        <Divider />
        <form onChange={handleChange} onSubmit={handleSubmit} enctype="multipart/form-data">
          <DialogContent>
            <label for="photo" class="mt-3">Photo: </label>
            <input type="file" name="photo"
              placeholder="Insert a picture"
              accept="image/*"
              onChange={(event) => {
                event.preventDefault();
                const { target } = event;
                // console.log(event.target.files[0]);
                const updatedData = { ...formData, [target.name]: target.files[0] };
                setImage(updatedData)
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              name="firstName"
              variant="outlined"
              id="firstName"
              label="First Name"
              onChange={(event) => {
                event.preventDefault();
                const { target } = event;
                const updatedData = { ...formData, [target.name]: target.value };
                setFormData(updatedData);
              }}
            />
            <TextField
              margin="dense"
              name="lastName"
              variant="outlined"
              id="lastName"
              label="Last Name"
              fullWidth
              onChange={(event) => {
                event.preventDefault();
                const { target } = event;
                const updatedData = { ...formData, [target.name]: target.value };
                setFormData(updatedData);
              }}
            />
            <TextField
              margin="dense"
              name="country"
              variant="outlined"
              id="country"
              label="Country"
              fullWidth
              onChange={(event) => {
                event.preventDefault();
                const { target } = event;
                const updatedData = { ...formData, [target.name]: target.value };
                setFormData(updatedData);
              }}
            />
            <TextField
              margin="dense"
              name="state"
              variant="outlined"
              id="state"
              label="State"
              fullWidth
              onChange={(event) => {
                event.preventDefault();
                const { target } = event;
                const updatedData = { ...formData, [target.name]: target.value };
                setFormData(updatedData);
              }}
            />
            <TextField
              margin="dense"
              name="city"
              variant="outlined"
              id="city"
              label="City"
              fullWidth
              onChange={(event) => {
                event.preventDefault();
                const { target } = event;
                const updatedData = { ...formData, [target.name]: target.value };
                setFormData(updatedData);
              }}
            />
            <TextField
              margin="dense"
              name="age"
              variant="outlined"
              id="age"
              label="Age"
              fullWidth
              onChange={(event) => {
                event.preventDefault();
                const { target } = event;
                const updatedData = { ...formData, [target.name]: target.value };
                setFormData(updatedData);
              }}
            />
            <TextField
              margin="dense"
              name="phone"
              variant="outlined"
              id="phone"
              label="Phone Number"
              fullWidth
              onChange={(event) => {
                event.preventDefault();
                const { target } = event;
                const updatedData = { ...formData, [target.name]: target.value };
                setFormData(updatedData);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button type="submit" color="secondary" variant="outlined">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default FormModal;