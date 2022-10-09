import React, { Component } from 'react';
import samplePDF from './ClassMaterials/Profile.pdf'
import demoData from '../../../../../../../../data/demoData'
import Flatlist from 'flatlist-react'
import {useStyles} from  '../../../../../Class/Components/style'
import { Divider } from '@material-ui/core';

function PostList(props){
    const {item} = props;
    const styles =  useStyles();
    const name = "Alkie";
    return(
        <li>
            <div className = {styles.root}>
                <div className = {styles.box}>
                    <div className = {styles.box_header}>
                        <div className = {styles.header_avatar}>
                            <img src = "" />
                        </div>
                        <div className = {styles.post_details}>
                            <label> {item.user_name} </label><br/>
                            <label> {item.post_time} </label>
                        </div>
                    </div>
                    <Divider/>
                    <div className = {styles.box_container}>
                        <text>
                            <h2> {item.post_text} </h2>
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
                </div>
            </div>
        </li>
    );
}
function Class1Body(){    
    const intel = demoData;
    return(
        <ol type = "none">
            <Flatlist list = {intel} renderItem = { <PostList item = {intel}/> } />
        </ol>        
    );
}
export default Class1Body;