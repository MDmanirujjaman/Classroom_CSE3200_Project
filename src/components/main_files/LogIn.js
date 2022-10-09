import React, { Component , useState } from 'react';
import LogInForm from '../LogInForm/index'
import Student from '../main_files/agms/Student/index'
import { Details } from '@material-ui/icons';
import Faculty from './agms/Faculty';
import { render } from '@testing-library/react';
import db from '../../util/getFireStore'
import { collection, query, where, getDocs , doc , getDoc} from "firebase/firestore";

function LogIn(){

    const[id , setId] = useState({
        email : "",
        password : "",
        type : "",
        classes : [],
    });

    const SignIn = async (details) => {
        if(details.type === "student"){
            console.log("INSIDE STUDENT");

            const docRef = doc(db, "all_students", details.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                if(docSnap.data().password === details.password){
                    console.log("Logged In");
                    setId({
                        email : details.email,
                        password : details.password,
                        type : details.type,
                        classes : docSnap.data().classes,
                        avatar : docSnap.data().avatar,
                        name : docSnap.data().name,
                    })
                    console.log({
                        email : details.email,
                        password : details.password,
                        type : details.type,
                        classes : docSnap.data().classes,
                        avatar : docSnap.data().avatar,
                        name : docSnap.data().name,
                    });
                }

            } else {
            // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        else if(details.type === "faculty"){
            const docRef = doc(db, "all_faculty", details.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if(docSnap.data().password === details.password){
                    console.log("Logged In");
                    console.log(docSnap.data());
                    setId({
                        email : details.email,
                        password : details.password,
                        type : details.type,
                        classes : docSnap.data().classes,
                        avatar : docSnap.data().avatar,
                        name : docSnap.data().name,
                    })
                    //console.log(id);
                }

            } else {
                console.log("No such document!");
            }
        }
    }

    const SignOut = () =>{
        setId({email : "" , password : "" , type : ""})
    }
    return(
        <div>
            {
                (id.email === "" && id.password === "" && id.type === "" ) ? (
                    <LogInForm SignIn = {SignIn} />
                ) : (
                    <Student SignOut = {SignOut} user_details ={id} />
                )
            } 
        </div>
    );
}
export default LogIn;