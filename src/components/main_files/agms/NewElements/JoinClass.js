import React, { Component , useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import db from '../../../../util/getFireStore'
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, addDoc, getFirestore, updateDoc , getDoc , arrayUnion} from "firebase/firestore"; 
import { makeStyles } from '@material-ui/core/styles';


function JoinClass({intel , user_details , setintel , updateUI}) {

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
        code : ""
    }

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [All, setAll] = useState(user_details.classes)

    const DoIt = async(name) =>{
        const classRef = doc(db , "all_students" , user_details.email);
        const newClass = {
            class_code : code,
            class_name : name
        }
        updateUI(code , name);
        await updateDoc(classRef , {
            classes : arrayUnion(newClass)
        })
        ////////////// updating authentication field
        const authRef = doc(db , "class_codes" , code);
        const newStudent = {
            email : user_details.email,
            name : user_details.name,
            auth : false
        }
        await updateDoc(authRef , {
            students : arrayUnion(newStudent)
        })
        setintel([...intel,newClass])
    }

    const UpdateStudentClassList = async() =>{

        const docRef = doc(db, "class_codes", code);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            DoIt(docSnap.data().name);
        } else {
            console.log("No such document!");
        }   
    }

    const checkMate = () =>{
        console.log("Inside CM !!");    
        UpdateStudentClassList();
        handleClose();
    }
    return (
        <div>
        <Button className = {styles.button_style}  onClick={handleClickOpen}>
           Join Class
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> Join a new class </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the class code :
                </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Class Code"
                        type="text"
                        fullWidth
                        value = {code}
                        onChange = {(e) => setCode(e.target.value)}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={checkMate} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
export default JoinClass;