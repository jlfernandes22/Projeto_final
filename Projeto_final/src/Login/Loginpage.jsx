import './loginpage.css';
import React, { useEffect, useState } from 'react';
import SignInForm from './SignInForm.jsx';

function Loginpage() {
    const [formToShow, setFormToShow] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);


    function togglePop(formType) {
        setFormToShow(formToShow === formType ? null : formType);
    }

    useEffect(() => {
        const url = 'https://api.sheety.co/ea4d203b7fab3b8dc5ca6598ef64557a/signupForm/imagens'

        fetch(url)
            .then((response) => response.json())
            .then(json => {
                const imagens = json.imagens;
                const firstImage = imagens[0];
                const imagem = firstImage.base64;
                setImageBase64(imagem);
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
            });

    }, []);




    return (
        <div className="login_page">
            <div className="login_buttons">
                <h1 className="heading_1">WHATS ON TODAY</h1>
                <h1 className="heading_2">Join and share</h1>
                <button className="login" onClick={() => togglePop("signIn")}>Sign in</button>
                {formToShow === "signIn" ? <SignInForm toggle={() => togglePop("signIn")} /> : null}
                <button className="sign_up" onClick={togglePop}>Create account</button>

            </div>
            <div className="logo">
                <img className='logo_img' src={`data:image/png;base64,${imageBase64}`} alt="logo" />
            </div>
        </div>
    );
}

export default Loginpage;
