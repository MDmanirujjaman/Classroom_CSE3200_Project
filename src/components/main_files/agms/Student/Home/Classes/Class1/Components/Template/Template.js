import React, { Component } from 'react';
import {useStyles} from './style';
import item from '../../../../../../../../../data/demoData';
import samplePDF from '../ClassMaterials/Profile.pdf'
import { Divider } from '@material-ui/core';

function Template(props){

    const styles =  useStyles();
    //const {items} = props;
    console.log(this.props.user_name);
    const name = "ALKATRAZ";
    return(
        <div className = {styles.root}>
            {/* <div className = {styles.box_xs}> */}

            <div className = {styles.box}>
                
                <div className = {styles.box_header}>
                    <div className = {styles.header_avatar}>
                        <img src = "" />
                    </div>
                    <div className = {styles.post_details}>
                        <label> {this.props.user_name} </label><br/>
                        <label>7 : 36 pm</label>
                    </div>
                </div>
                <Divider/>
                <div className = {styles.box_container}>
                   <text>
                       <h2></h2>
                    </text>
                    <a 
                        href = { samplePDF } 
                        without rel="noopener noreferrer" 
                        target="_blank"
                        >
                        <button  label={name}>
                            {name}
                        </button>
                    </a>
                </div>
                
            {/* </div> */}
            </div>
        </div>
    );
}
export default Template;