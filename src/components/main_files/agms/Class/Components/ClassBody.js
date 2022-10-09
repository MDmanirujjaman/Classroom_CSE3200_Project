import React, { Component , useState } from 'react';
import {useStyles} from  './style'
import { Divider } from '@material-ui/core';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';


function Class1Body({user_details , classDetails}){

    const [intel, setIntel] = useState(classDetails.class_materials)

    console.log(classDetails);
    
    const PostList2 = (e) =>{
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
                                <label className = {styles.post_user_name}> {e.value.post_user } </label><br/>
                                <label className = {styles.post_time}> {e.value.post_time} </label>
                                {/* <p className = {styles.post_user_name}>
                                    
                                </p>
                                <p className = {styles.post_time}>26 Jul</p> */}
                            </div>
                        </div>
                        <Divider/>
                        <div className = {styles.box_container}>
                            <div className = {styles.text_container}>
                                <br/>
                                <label className = {styles.post_text_p}>
                                    {e.value.post_text}
                                </label>
                            </div>
                            
                            <div className = {styles.media_container}>
                                <div className = {styles.media_container_unit}>
                                    <a 
                                        href = { e.value.post_pdf } 
                                        without rel="noopener noreferrer" 
                                        target="_blank"
                                    >
                                        <button  label={name}>
                                            <PictureAsPdfSharpIcon/>
                                        </button>
                                    </a>
                                </div>
                                <div className = {styles.media_container_unit}>
                                    <a 
                                        href = { e.value.post_video } 
                                        without rel="noopener noreferrer" 
                                        target="_blank"
                                    >
                                        <button  label={name}>
                                            <VideoLibrarySharpIcon/>
                                        </button>
                                    </a>
                                </div>
                                <div className = {styles.media_container_unit}>
                                    <a 
                                        href = { e.value.post_image } 
                                        without rel="noopener noreferrer" 
                                        target="_blank"
                                    >
                                        <button  label={name}>
                                            <ImageSharpIcon/>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
            </li>
        );
    }
    
    return(
        <ul type = "none">
            {intel.reverse().map((item) => <PostList2 key = {item.post_time} value = {item} />)}
        </ul>    
    );
}
export default Class1Body;
