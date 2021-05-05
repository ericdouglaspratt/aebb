import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import './AboutDialog.css';

const DialogTitle = ({ children, onClose }) => {
  return (
    <MuiDialogTitle className='AboutDialog-title' disableTypography>
      <h6 className='AboutDialog-titleHeader'>{children}</h6>
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

function AboutDialog({
  children,
  onClose,
  open
}) {
  return (
    <Dialog
      aria-labelledby="about-dialog-title"
      maxWidth="lg"
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
    >
      <DialogTitle id="about-dialog-title" onClose={onClose}>
        About the Journey
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default AboutDialog;
