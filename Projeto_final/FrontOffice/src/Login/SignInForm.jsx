import './SignIn.css';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '../NavigationContext';


function SignInForm({ toggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { navigate } = useNavigation();


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
                
                if (data.error) {
                    setErrorMessage(data.error)
                } else {
                    handleGoToFeed(data.user.name)
                }
            })
            .catch(error => {

                console.error('Fetch error:', error);
            });
    }
    function handleGoToFeed() {
        navigate('feed');
        localStorage.setItem("username", username);
        window.location.reload();
        console.log(username);
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
                    <input type='text' placeholder='Enter your username' value={username} className='username_signin' onChange={e => setUsername(e.target.value)} required />


                    <label className='password_label'>Password</label>
                    <input type='password' placeholder='Enter your password' value={password} className='password' onChange={e => setPassword(e.target.value)} required />


                    <div className="errorMessage">{errorMessage}</div>

                    <div className='Buttons'>
                        <button type='Button' onClick={toggle} className='cancel'>Cancel</button>
                        <button type='submit' className='sign_In_create'>Sign In</button>
                    </div>
                </div>
            </form>
    );
}
export function getUsername(){
    return username;
}

export default SignInForm;
