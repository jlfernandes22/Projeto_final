import './SignIn.css';
import React, { useState, useEffect } from 'react';

function SignInForm({ toggle }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernames,setUsernames] = useState([]);
    const [passwords,setPasswords] = useState([]);
    
    useEffect(() => {
        const sheetId = '1QMk5kEwdYM-q23yRXWQ_JMdnSG48n0eQ2PzhXQ9MN5w'; // Replace with your Google Sheet ID
        const range = 'Contas'; // Replace with your desired range in A1 notation
        const apiKey = 'AIzaSyAtCw2hu2qKhfeflrGIK9XeR0jlt-Wj75Y'; // Replace with your API key

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.values) {
                    const rows = data.values; // Array of rows from the Google Sheet
                    const jsonUsernames = [];
                    const jsonPasswords = [];
                    
                    for (let i = 1; i < rows.length; i++) { // Skip the header row
                        const [username, password] = rows[i];
                        console.log(rows[i]);
                        jsonUsernames.push(username || '');
                        jsonPasswords.push(password || '');
                    }
                    setUsernames(jsonUsernames);
                    setPasswords(jsonPasswords);
                } else {
                    console.error('No data found in the sheet.');
                }
            })
            .catch((error) => {
                console.error('Error fetching accounts:', error);
            });

    }, []);


    function handleLogin(e) {
        e.preventDefault();
        for (let i = 0;i<usernames.length;i++){
            if(username.toUpperCase() === usernames[i].toUpperCase()){
                if(password.toUpperCase() === passwords[i].toUpperCase()){
                    console.log('sucesso');
                    //ir para o feed
                    document.getElementsByClassName('wrong_password')[0].style.display='none';
                    document.getElementsByClassName('no_account')[0].style.display='none';
                }else{
                    console.log('Wrong password')
                    document.getElementsByClassName('wrong_password')[0].style.display='block';
                    document.getElementsByClassName('no_account')[0].style.display='none';
                }
                
            }else{
                console.log('conta não existe');
                //aparecer que não existe a conta e perguntar se quer criar uma 
                document.getElementsByClassName('wrong_password')[0].style.display='none';
                document.getElementsByClassName('no_account')[0].style.display='block';
            }
        }
        
    }

    return (
        <form className='teste' onSubmit={handleLogin}>
            <div className='form'>
                <h1 className='sign_in_heading'>Sign In</h1>

                <label className='username_label'>Username</label>
                <input type='text' placeholder='Enter your username' value={username} className='username' onChange={e => setUsername(e.target.value)} required
                />
                

                <label className='password_label'>Password</label>
                <input type='password' placeholder='Enter your password' value={password} className='password' onChange={e => setPassword(e.target.value)} required />
                <label className='wrong_password'>Wrong Password</label>
                <label className='no_account'>Account does not exist</label>

                <div className='Buttons'>
                    <button type='Button' onClick={toggle} className='cancel'>Cancel</button>
                    <button type='submit' className='sign_In_create'>Sign In</button>
                </div>
            </div>
        </form>
    );
}

export default SignInForm;
