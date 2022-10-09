import React, { Component , useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Class from '../Class/index'
import CreateClass from '../NewElements/CreateClass';
import JoinClass from '../NewElements/JoinClass';
import db from '../../../../util/getFireStore'
import { collection, query, where, getDocs , getDoc , doc} from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      //padding: theme.spacing(10),
      // paddingLeft : '20px',
      // paddingRight :'20px',
      height : '100px',
      width : '250px',
      textAlign: 'center',
      paddingTop : '95%',
      color: theme.palette.text.secondary,
      backgroundColor : '#e8e8e8',
      borderRadius : theme.spacing(5),
      //paddingRight : '20px'
    },
    button:{
      marginLeft : '160ch',
      minHeight : '2ch'
    }
  }));

function Body({user_details}){

    const classes = useStyles();
    
    const [classDetails, setClassDetails] = useState({
      class_materials : [],
      students : [],
      code_class : "",
      faculty_email : "",
      name : ""
    })

    const [classroom, setclassroom] = useState({
      class_name : "",
      user_type : ""
    });

    const [code, setCode] = useState()
    const [selectedCode, setSelectedCode] = useState()
    const [className, setclassName] = useState()


    const [situation, setsituation] = useState({
      value : false
    })

    const [intel, setintel] = useState(user_details.classes || []);

    const go_back_list = () =>{
      setclassroom({
        class_name : "",
        user_type : ""
      })

      setsituation({
        value : false
      })
    }

    const updateUI = (local_code , local_className) =>{
      setclassName(local_className);
      setCode(local_code);
    }

    const FormRow = () => {  
      
      const ClassList = (e) =>{

        const confirm_class = async (val) =>{
          let authConfirmation = false;
          console.log("FLAAAAAAAAAAAAAAAAAG");
          setSelectedCode(val.class_code);

          const docRef = doc(db, "class_codes", val.class_code);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            
            if(user_details.type === "student"){
              ///// checking for authenticity
              docSnap.data().students.forEach(element => {
                if(element.email === user_details.email && element.name === user_details.name){
                  if(element.auth !== authConfirmation){
                    authConfirmation = true;
                  }
                }
              });

              if(authConfirmation === false){
                setClassDetails({
                  class_materials : docSnap.data().fake_class_materials,
                  students : docSnap.data().students,
                  code_class : docSnap.data().code,
                  faculty_email : docSnap.data().faculty_email,
                  name : docSnap.data().name
                });  
              } else{
                setClassDetails({
                  class_materials : docSnap.data().class_materials,
                  students : docSnap.data().students,
                  code_class : docSnap.data().code,
                  faculty_email : docSnap.data().faculty_email,
                  name : docSnap.data().name
                });
              }
            }else{
              setClassDetails({
                class_materials : docSnap.data().class_materials,
                students : docSnap.data().students,
                code_class : docSnap.data().code,
                faculty_email : docSnap.data().faculty_email,
                name : docSnap.data().name
              });
            }
            setclassroom({
              class_name : classDetails.name,
              user_type : user_details.type
            })
            setsituation({
              value : true
            })
          } else {
            console.log("No such document!");
          }
        }

        return(
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <div >
                    <Button 
                      color="secondary" 
                      size = "large" 
                      onClick = {() =>confirm_class(e.value)} 
                    >
                       {e.value.class_name}
                    </Button>
                </div>
            </Paper>
            <br/>
          </Grid>
        );
      }

      return (
        <ul type = "none">
          {intel.map((item) => <ClassList key = {item.class_code} value = {item} />)}
        </ul>
      );
    }

    return(
      <div>
        {
          ((classroom.class_name === "") && (situation.value === false)) ? (   /// the situation when we haven't selected any classes
            <div className={classes.root}>
              <div className = {classes.button}>
                {
                  (user_details.type === "student") ? (<JoinClass intel = {intel} user_details = {user_details} setintel = {setintel} updateUI = {updateUI}/>) 
                  : (<CreateClass intel = {intel} user_details ={user_details} setintel = {setintel} updateUI = {updateUI}/>)
                }
              </div>
                <br/>
                <Grid container spacing={1}>
                    <Grid container item xs={8} spacing={4}>
                        <FormRow />
                    </Grid>
                </Grid>
            </div>
          ) : (     //// after selecting the class now getting to the class
            <Class classDetails = {classDetails} 
              xs1 = {classroom.user_type} 
              user_details = {user_details} 
              go_back_list = {go_back_list} 
              setClassDetails = {setClassDetails} 
            />
          ) //
        }
      </div>

          
    );
}
export default Body;