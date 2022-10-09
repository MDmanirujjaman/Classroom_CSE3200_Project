import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ClassHeader from '../Class/Components/ClassHeader';
import ClassBody from '../Class/Components/ClassBody'
import Peoples from '../Peoples';
import PostBox from './Components/PostBox';
import FacultyWindow from './Components/FacultyWindow';
import { GiOpenBook } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
    root : {
        
        background: 'linear-gradient(45deg,#18A558 50%, #1e3825 30%)',
    },
    top_container:{
        background: 'linear-gradient(45deg,#18A558 50%, #1e3825 30%)',
    }
    
});
function Class({ classDetails , xs1 , user_details , go_back_list , setClassDetails}){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    //console.log(classDetails.code_class);

    return (
        <div>
            <div className = {classes.top_container}>
                {/* Header definition */}
                <ClassHeader title = {classDetails.name} code = {classDetails.code_class} go_back_list = {go_back_list}/>
                    {/* body definition */}
                
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction  icon = {<GiOpenBook size = "40px"/>} />
                    {(xs1 === "faculty") && (<BottomNavigationAction icon = {<BsPeopleFill size = "40px"/>} />)}
                </BottomNavigation>
            </div> 
            <br/>
            {
                (xs1 === "faculty") && (
                    <div>
                        {
                            (value === 0) && (
                                <FacultyWindow user_details = {user_details} classDetails = {classDetails} setClassDetails = {setClassDetails} />
                            )
                        }
                        {
                            (value === 1) && (
                                <Peoples classDetails = {classDetails}/>
                            )
                        }
                        
                    </div>
                )
            }
            {
                (xs1 === "student") && (
                    <div>
                        {
                            (value === 0) && (
                                <ClassBody user_details = {user_details} classDetails = {classDetails}/>
                            )
                        }
                    </div>
                )
            }
            
        </div>
    );
}
export default Class;