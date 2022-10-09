import React, { Component , useState , useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import db from '../../../../util/getFireStore';
import { doc, setDoc ,collection, addDoc, getFirestore, updateDoc , arrayUnion} from "firebase/firestore"; 
import { makeStyles } from '@material-ui/core/styles';

function CreateClass({intel , user_details , setintel , updateUI}){

    const useStyles = makeStyles((theme) => ({
        button_style:{
            minHeight : '60px',
            minWidth : '200px',
            backgroundColor : '#dff2e1',
            borderRadius : '10px'
        }
    }));

    const styles = useStyles();

    const newClassDetails = {
        faculty_email: user_details.email,
        code : "",
        name : "",
        class_materials : [],
        fake_class_materials : [],
        students : []
    }

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("")
    const [className, setclassName] = useState("")
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setclassName("");
        setCode("");
    };

    var result = '';
    const generateCode = () =>{
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setCode(result)
    }

    const saveNewClass = async() => {
        const classRef = doc(db, "class_codes", code);
        setDoc(classRef, newClassDetails , { merge: true });
    }

    const UpdateFacultyClassList = async () =>{
        const materialRef = doc(db , "all_faculty" , user_details.email);
        const newClass = {
            class_code : code,
            class_name : className
        }
        await updateDoc(materialRef , {
            classes : arrayUnion(newClass)
        })
        setintel([...intel,newClass])
        
    }

    const checkMate = () =>{
        console.log("Inside CM !!");
        newClassDetails.name = className
        newClassDetails.code = code
        saveNewClass();
        UpdateFacultyClassList();
        console.log(newClassDetails);
        updateUI(code , className);
        handleClose();
    }
    return (
        <div>
        <Button variant="outlined" className = {styles.button_style} onClick={handleClickOpen}>
           <b>Create Class</b>
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Class </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill up the given form to create your new class
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Class Name"
                    type="text"
                    fullWidth
                    value = {className}
                    onChange = {(e) => setclassName(e.target.value)}
                />
                <DialogContentText>
                    Generate your class code
                </DialogContentText>
                <Button onClick = {generateCode} color = "primary">
                    Generate Code
                </Button>
                <DialogContentText>
                    {code}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button 
                    disabled = {(code === "" || className === "") ? true : false} 
                    onClick={checkMate} 
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
export default CreateClass;