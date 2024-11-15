import './SignIn.css';
import React, { useState } from 'react';

function SignInForm({ toggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        // code to handle login
        toggle();
    }

    return (
        <form className='teste' onSubmit={handleLogin}>
            <div className="form">
                <h1 className='sign_in_heading'>Sign In</h1>

                <label className='username_label'>Username</label>
                <input type="text" placeholder="Enter your username" value={username} className="username" onChange={e => setUsername(e.target.value)} required
                />

                <label className='password_label'>Password</label>
                <input type="password" placeholder="Enter your password" value={password} className="password" onChange={e => setPassword(e.target.value)} required />

                <div className="Buttons">
                    <button onClick={toggle} className="cancel">Cancel</button>
                    <button type="submit" className="sign_In_create">Sign In</button>
                </div>
            </div>
        </form>
    );
}

export default SignInForm;
