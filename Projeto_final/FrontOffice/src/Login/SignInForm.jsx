import './SignIn.css';
import React, { useState, useEffect } from 'react';
import Users from '../../../BackOffice/Users'
import axios from "axios";
import { useFormState } from 'react-dom';

function SignInForm({ toggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');



    function login(username, password) {
        // Your JSON data
        const jsonData = { name: username, pass: password };

        // Set up options for the fetch request
        const options = {
            method: 'LOGIN',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(jsonData) // Convert JSON data to a string and set it as the request body
        };

        // Make the fetch request with the provided options
        fetch('http://localhost/restapi/users.php', options)
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response as JSON
                return response.json();
            })
            .then(data => {
                // Handle the JSON data
                if(data.error){
                    setErrorMessage(data.error)
                }                    
            })
            .catch(error => {
                
                console.error('Fetch error:', error);
            });
    }



    return (
        <form className='teste'
            onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                login(username, password); // Call the login function with the current username and password
            }}>
            <div className='form'>
                <h1 className='sign_in_heading'>Sign In</h1>

                <label className='username_label'>Username</label>
                <input type='text' placeholder='Enter your username' value={username} className='username_signin' onChange={e => setUsername(e.target.value)} required/>
               
                <label className='no_account'>Account does not exist</label>

                <label className='password_label'>Password</label>
                <input type='password' placeholder='Enter your password' value={password} className='password' onChange={e => setPassword(e.target.value)} required />
                
                <label className='wrong_password'>Wrong Password</label>
                <div className="errorMessage">{errorMessage}</div>

                <div className='Buttons'>
                    <button type='Button' onClick={toggle} className='cancel'>Cancel</button>
                    <button type='submit' className='sign_In_create'>Sign In</button>
                </div>
            </div>
        </form>
    );
}

export default SignInForm;
