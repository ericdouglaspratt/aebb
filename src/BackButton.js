import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#ffffff'
  }
}));

const BackButton = ({onClick}) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      onClick={onClick}
      startIcon={<ArrowBack />}
    >
      Back
    </Button>
  );
};

export default BackButton;
