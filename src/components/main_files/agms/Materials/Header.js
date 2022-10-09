import React, { Component } from 'react';
import {  Menu } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import CreateClass from '../NewElements/CreateClass';
import JoinClass from '../NewElements/JoinClass';


function StudentHeader({toggleDrawer  , anchor}){
    return(
        <div>
            <IconButton
                aria-label = "menu"
                onClick ={toggleDrawer(anchor , true)}
            >
                <Menu/>
            </IconButton>
            {/* <div>
                <JoinClass/>
            </div> */}
        </div>
    );
}
export default StudentHeader;