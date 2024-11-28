import SignInForm from "../FrontOffice/src/Login/SignInForm";
import { useState, useEffect } from "react";

function Users() {



    const [usernames, setUsernames] = useState([]);
    const [passwords, setPasswords] = useState([]);

    // Your JSON data
const jsonData = { key1: 'value1', key2: 'value2' };

// Set up options for the fetch request
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' // Set content type to JSON
  },
  body: JSON.stringify(jsonData) // Convert JSON data to a string and set it as the request body
};

// Make the fetch request with the provided options
fetch('https://api.example.com/upload', options)
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
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });



    function handleLogin(e) {
        e.preventDefault();

        for (let i = 0; i < usernames.length; i++) {
            if (username === usernames[i]) {
                if (password === passwords[i]) {
                    console.log('sucesso');
                    //ir para o feed
                    document.getElementsByClassName('wrong_password')[0].style.display = 'none';
                    document.getElementsByClassName('no_account')[0].style.display = 'none';
                } else {
                    console.log('Wrong password')
                    document.getElementsByClassName('wrong_password')[0].style.display = 'block';
                    document.getElementsByClassName('no_account')[0].style.display = 'none';
                }

            } else {
                console.log('conta não existe');
                //aparecer que não existe a conta e perguntar se quer criar uma 
                document.getElementsByClassName('wrong_password')[0].style.display = 'none';
                document.getElementsByClassName('no_account')[0].style.display = 'block';
            }
        }

    }


}

export default Users