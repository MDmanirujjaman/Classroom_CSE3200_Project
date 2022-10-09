import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Class1Body from './Components/Class1Body';
import StudentHeader from '../../StudentHeader';
import ClassHeader from '../ClassComponents/ClassHeader';
import Body from '../../../../Materials/Body';
import ClassBody from '../../../../Class/Components/ClassBody'
import Peoples from '../../../../Peoples';


const useStyles = makeStyles({
    root: {
        width: 800,
    },
});
function Class1(){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <div>
           {/* Header definition */}
           
           <ClassHeader title = "CSE 3100"/>

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
                <BottomNavigationAction label="Class Stream" />
                <BottomNavigationAction label="Students"/>
                
            </BottomNavigation>
            <div>
                {
                    (value === 0) && (
                        <ClassBody/>
                    )
                }
                {
                    (value === 1) && (
                        <Peoples/>
                    )
                }
                

            </div>
        </div>
    );
}
export default Class1;