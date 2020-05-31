import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#ffffff'
  }
}));

const MenuButton = ({onClick}) => {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
};

export default MenuButton;
