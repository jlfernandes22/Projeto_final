import React, { useState, useEffect } from 'react';



function SignUpForm({ toggle }) {
    const [newname, setNewName] = useState('');
    const [newpass, setNewPass] = useState('');
    const [errorMessage,setErrorMessage] = useState(''); 
    const [creationMessage, setCreationMessage] = useState('');       

    function login(newname, newpass) {
        // Your JSON data
        const jsonData = { name: newname, pass: newpass };

        // Set up options for the fetch request
        const options = {
            method: 'POST',
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
                    setCreationMessage("");
                }else{
                    setErrorMessage("");
                    setCreationMessage("Conta Criada!");
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
                login(newname, newpass); // Call the login function with the current username and password
            }}>
            <div className='form'>
                <h1 className='sign_up_heading'>Sign Up</h1>
                
                <label className='username_label'>Username</label>
                <input type='text' placeholder='Enter your username' value={newname} className='username' onChange={e => setNewName(e.target.value)} required />
                <label className='account_exists'>Account alredy exists</label>

                <label className='password_label_signUp'>Password</label>
                <input type='password' placeholder='Enter your password' value={newpass} className='password' onChange={e => setNewPass(e.target.value)} required />
                <div className="errorMessage">{errorMessage}</div>

                <div className="errorMessage">{creationMessage}</div>

                <div className='Buttons'>
                    <button type='Button' onClick={toggle} className='cancel'>Cancel</button>
                    <button type='submit' className='sign_Up_create'>Sign Up</button>
                </div>
            </div>
        </form>
    );
}

export default SignUpForm