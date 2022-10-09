import React, { Component , useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarProvider, useSnackbar } from 'notistack';


const useStyles = makeStyles(theme => ({
    rootPage:{
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        // backgroundColor : '#bdcaff'
         background: 'linear-gradient(45deg, #18A558 30%, #2c7d42 90%)', 
        minHeight : '9ch',
        minWidth : '100%',
        fontFamily : 'arial',
        borderBottomRightRadius : '10px',
        borderTopRightRadius : '10px'
    },
    back_button:{
        marginLeft : '2ch',
        minheight : '100%',
        marginTop : '5ch'
        //backgroundColor : 'blue',
        
    },
    title:{
        //backgroundColor : 'red',
        marginLeft : '63ch'
    },
    button_style:{
        backgroundColor : '#FFFFFF'
        
    },
    copy_code:{
        marginLeft : '60ch',
        marginTop : '5ch',
        paddingRight : '10px'
    },
    copy_button:{
        backgroundColor : '#FFFFFF'
    },
    class_name : {
        size : '70px',
        color : '#302e2e'
    },
}));

function ClassHeader({title , code , go_back_list}){
    const classes = useStyles();

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    
    const { vertical, horizontal, open } = state;

    const copyToClipboard = () => {
        let elementText = code;
        let inputElement = document.createElement('input')
        inputElement.setAttribute('value' , elementText);
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        inputElement.parentNode.removeChild(inputElement);
    };
    
      const handleClick = (newState) => () => {
          copyToClipboard();
          setState({ open: true, ...newState });
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };
    
      const buttons = (
        <React.Fragment>
            <Button 
                className = {classes.copy_button} 
                onClick={handleClick({ vertical: 'top', horizontal: 'center' })}
                // onClick={handleClickVariant('success')}
            >
            Grab the class code
            </Button>
        </React.Fragment>
      );

    return(
        <div className = {classes.rootPage}>
            {/* back button */}
            <div className = {classes.back_button}>
                <Button
                    // variant="contained"
                    className={classes.button_style}
                    startIcon={<HomeIcon />}
                    onClick = {go_back_list}
                >
                    your classes
                </Button>
            </div>
            {/* classs title */}
            <div className = {classes.title}>
                < p className = {classes.class_name}>
                    <h3><b>{title}</b></h3>
                </p>  
            </div>
            {/* getting class code */}
            <div className = {classes.copy_code}>
                {buttons}
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="Code Copied !"
                    key={vertical + horizontal}
                />

            </div>            
        </div>
    );
}
export default ClassHeader;