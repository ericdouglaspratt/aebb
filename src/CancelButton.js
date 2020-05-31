import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#ffffff'
  }
}));

const CancelButton = ({onClick}) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      onClick={onClick}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
