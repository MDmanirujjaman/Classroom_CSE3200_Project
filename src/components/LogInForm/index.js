import React , {useState } from 'react';
import './LogIn.css';

function LogInForm({SignIn}){

    const [detail, setdetail] = useState({email : "" , password : "" , type : ""});

    const submitHandler = e =>{
        e.preventDefault();
        SignIn(detail);
    }
    return(
        <div className ="root">
            
            <form onSubmit = {submitHandler}>
                <div className = "login-container">
                    <h1>Classroom For CSE Department</h1>
                    <div className = "login-elements">
                        {/* s */}
                        <div className = "login-elements-labels">
                            <label htmlFor = "name"> E - mail / Handle : </label>
                        </div>

                        <div className = "login-elements-input">
                            <input
                                type = "email" 
                                name = "email"  
                                placeholder = "Enter your email or handle" 
                                onChange = {e => setdetail({...detail , email : e.target.value})} 
                                value = {detail.name}
                            />
                        </div>
                        <div className = "login-elements-labels">
                            <label htmlFor = "password" > Password : </label>
                        </div>

                        <div className = "login-elements-input">
                            <input 
                                type = "password" 
                                name = "password" 
                                placeholder = "Enter your password"
                                onChange = {e => setdetail({...detail , password : e.target.value})} 
                                value = {detail.password}
                            />
                        </div>
                        
                        <div className = "login-elements-labels">
                            <label htmlFor = "select" > Get logged in as : </label>
                        </div>

                        <div>                    
                            <select  className = "login-elements-labels" value = {detail.type} onChange={ e => setdetail({...detail , type : e.target.value })}>
                                <option value="select">Select</option>
                                <option value="faculty">Faculty</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        
                        <div className = "login-elements-submit">
                            <input type = "submit" name = "submit" value = "Sign In"  onClick = {SignIn} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
        

    );
    
}
export default LogInForm;