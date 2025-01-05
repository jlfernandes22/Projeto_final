import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "../NavigationContext";
import "./editprofile.css";

function EditProfile() {
    const { username, changeUsername, user_id } = useNavigation();
    const userSubmit = useRef("");
    const passSubmit = useRef("");
    const [newUser, setNewUser] = useState("");
    const [newPass, setNewPass] = useState("");
    const [profilePicture, setProfilePicture] = useState(null); // State for holding profile image
    const fileInput = useRef(null);

    useEffect(() => {
        if (userSubmit.current) {
            userSubmit.current.value = "";
        }
        if (passSubmit.current) {
            passSubmit.current.value = "";
        }
    }, [username]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result); // Set the uploaded image as the profile picture
            };
            reader.readAsDataURL(file);
        }
    };

    function changeUserName(id, newUsername, newPassword, newProfilePic) {
        if (newUsername !== "" && newPassword !== "") {
            const user_id = Number(id);
            const jsonData = { 
                id: user_id, 
                name: newUsername, 
                pass: newPassword, 
                profile_picture: newProfilePic 
            };
    
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            };
    
            fetch('http://localhost/restapi/users.php', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        console.error(data.error);
                    } else {
                        console.log("Profile Updated Successfully!");
                        changeUsername(newUsername);
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
    }
    

    const handleFileButton = () => {
        fileInput.current.click();
    };

    return (
        <div className="containerEditProfile">
            <p>Alterar Nome</p>
            <input 
                type="text" 
                ref={userSubmit} 
                name="" 
                id="name" 
                onChange={(e) => setNewUser(e.target.value)} 
            />
            <p>Alterar Senha</p>
            <input 
                type="password" 
                ref={passSubmit} 
                name="" 
                id="pass" 
                onChange={(e) => setNewPass(e.target.value)} 
            />
            <p>Alterar Imagem</p>
            <button onClick={handleFileButton}>Escolher Imagem</button>
            {profilePicture && <img src={profilePicture} alt="Preview" className="profileImagePreview" />}
            <button 
                style={{ display: "block", margin: "auto" }} 
                onClick={() => changeUserName(user_id, newUser, newPass, profilePicture)}
            >
                Alterar
            </button>

            {/* Hidden file input */}
            <input 
                ref={fileInput} 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: "none" }} 
            />
        </div>
    );
}

export default EditProfile;
