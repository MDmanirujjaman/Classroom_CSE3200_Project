import { makeStyles } from "@material-ui/core";
import React from 'react'
import { Row } from "react-bootstrap";

export const useStyles = makeStyles((theme) =>({
    root:{
        flexGrow : 1,
        marginLeft : '20%',
        // alignContent : 'center',
        
        //backgroundColor : 'blue'
    },
    box:{
        maxheight : '70%',
        maxWidth : '75%',
        backgroundColor: '#FFFFFF',
        borderRadius : 20,
        paddingLeft : '25px',
        paddingRight : '25px',
        paddingBottom : '30px',
        paddingTop : '15px'
    },
    box_xs:{
        
    },
    box_header:{
        display : 'flex',
        flexDirection : 'row',
        height : '5%',
        //backgroundColor : 'green'
    },
    box_container:{
        display: 'flex',
        flexDirection : 'column'
    },
    header_avatar:{
        height:'50px',
        width :'50px',
        borderRadius : 50,
        backgroundColor : 'red',
    },
    post_details:{
        //backgroundColor : 'blue',
        paddingTop : 10,
        paddingLeft : 8,
        paddingBottom : 10
    },
    media_container : {
        display : 'flex',
        flexDirection : 'row',
        marginTop : '2ch'
    },
    media_container_unit :{
        marginLeft : '10px'
    },
    post_user_name:{
        fontSize : '20px',
        color : '#3d3c38',
        fontFamily : 'arial'
    },
    post_time:{
        color : '#3d3c38',
        fontFamily : 'arial',
    },
    post_text_p:{
        color : '#3d3c38',
        fontSize : '25px',
        fontFamily : 'arial',
    }


}));