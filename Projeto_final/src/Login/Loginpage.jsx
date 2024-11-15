import './loginpage.css';
import React, { useState } from 'react';
import SignInForm from './SignInForm.jsx';
import SignIn from './SignIn.css';

function Loginpage() {
    const [formToShow, setFormToShow] = useState(null);

    function togglePop(formType) {
        setFormToShow(formToShow === formType ? null : formType);
    }

    return (
        <div className="login_page">
            <div className="login_buttons">
                <h1 className="heading_1">WHATS ON TODAY</h1>
                <h1 className="heading_2">Join and share</h1>
                <button className="login" onClick={()=>togglePop("signIn")}>Sign in</button>
                {formToShow === "signIn" ? <SignInForm toggle={() => togglePop("signIn")}/> : null}
                <button className="sign_up" onClick={togglePop}>Create account</button>
                
            </div>
            <div className="logo">
                <img src="logo.png" alt="logo" />
            </div>
        </div>
    );
}

export default Loginpage;
