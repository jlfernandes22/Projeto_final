import './SignIn.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";


function SignUpForm({ toggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernames, setUsernames] = useState([]);

    

    //API PARA ENVIAR PARA O SHEETS



    function handleNewAccount(e) {
        e.preventDefault();
        for (let i = 0; i <= usernames.length; i++) {
            if (username.toUpperCase() === usernames[i].toUpperCase()) {
                console.log('Conta já existe'); //working
                document.getElementsByClassName('account_exists')[0].style.display = 'block';
            }
        }
        toggle();
    }

    return (
        <form className='teste' onSubmit={handleNewAccount}>
            <div className='form'>
                <h1 className='sign_up_heading'>Sign Up</h1>

                <label className='username_label'>Username</label>
                <input type='text' placeholder='Enter your username' value={username} className='username' onChange={e => setUsername(e.target.value)} required />
                <label className='account_exists'>Account alredy exists</label>

                <label className='password_label'>Password</label>
                <input type='password' placeholder='Enter your password' value={password} className='password' onChange={e => setPassword(e.target.value)} required />


                <div className='Buttons'>
                    <button type='Button' onClick={toggle} className='cancel'>Cancel</button>
                    <button type='submit' className='sign_Up_create'>Sign Up</button>
                </div>
            </div>
        </form>
    );
}

export default SignUpForm