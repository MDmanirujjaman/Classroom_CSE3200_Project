import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Label, Menu } from "@material-ui/icons";
import { Avatar, IconButton } from '@material-ui/core';
import Header from '../Materials/Header'
import Body from '../Materials/Body';
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },

  large:{
    width : theme.spacing(50),
    height : theme.spacing(50)
  }
}));

function Student(){
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  function LogOut(){
    alert('Inside LogOut function');
  }


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <div>
          <Avatar src = "/src/media/mai.jpeg"/>
        </div>
        <h2> MD AMIRUL ISLAM </h2>
      </div>

      <Divider />
      <Button variant="contained" color='#b6c1d4' onClick = {LogOut} >
        LOG OUT
      </Button>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>

          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          
          <div>
            <Header toggleDrawer = {toggleDrawer} anchor = {anchor}/>
            <Body/>
          </div>
          
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default Student;
