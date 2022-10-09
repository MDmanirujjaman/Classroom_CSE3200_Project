import React, { Component } from 'react';
import {  Menu } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';



function StudentHeader({toggleDrawer  , anchor}){
    return(
        <div>
            <IconButton
                aria-label = "menu"
                onClick ={toggleDrawer(anchor , true)}
            >
                <Menu/>
            </IconButton>
            <label> Classes </label>
        </div>
        
    );
}
export default StudentHeader;