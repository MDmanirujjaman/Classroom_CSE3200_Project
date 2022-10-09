import React, { Component , useState } from 'react';
import ClassBody from './ClassBody';
import PostBox from './PostBox';

function FacultyWindow({user_details , classDetails , setClassDetails}) {


    return(
        <div>
            <PostBox user_details = {user_details} classDetails = {classDetails} setClassDetails = {setClassDetails} />
            <ClassBody user_details = {user_details} classDetails = {classDetails}/>
        </div>
        
    );
}
export default FacultyWindow;