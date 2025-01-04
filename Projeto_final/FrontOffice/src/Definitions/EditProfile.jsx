import React, {useState, useEffect, useRef} from "react";
import { useNavigation } from "../NavigationContext";
import "./editprofile.css"

function EditProfile(){

    const { username, changeUsername, user_id} = useNavigation()
    const userSubmit = useRef("");
    const passSubmit = useRef("");
    const [newUser, setNewUser] = useState("");
    const [newPass, setNewPass] = useState("");

    useEffect(() => {
           if(userSubmit.current){
            userSubmit.current.value = ""
           }
           if(passSubmit.current){
            passSubmit.current.value = ""
           }
        }, [username])


        function changeUserName(id, newUsername, newPassword) {
            // Your JSON data
            if(newUsername !== "" && newPassword !== ""){
                const user_id = Number(id);
            const jsonData = { id: user_id, name: newUsername, pass: newPassword };
    
            // Set up options for the fetch request
            const options = {
                method: 'PUT',
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
                    }else{
                        console.log("Username Updated Successfully!")
                        changeUsername(newUsername)
                    }
                })
                .catch(error => {
    
                    console.error('Fetch error:', error);
                });
            }
        }      

    return(
        <div className="containerEditProfile">
            <p>Alterar Nome</p>
            <input type="text" ref={userSubmit} name="" id="name" onChange={(e) => setNewUser(e.target.value)} />
            <p>Alterar Pass</p>
            <input type="password" ref={passSubmit} name="" id="pass" onChange={(e) => setNewPass(e.target.value)} />
            <button style={{display: "block", margin: "auto"}} onClick={() => changeUserName(user_id, newUser, newPass)} >Alterar</button>
        </div>
    );
}

export default EditProfile;