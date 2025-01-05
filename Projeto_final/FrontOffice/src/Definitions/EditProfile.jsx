import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "../NavigationContext";
import "./editprofile.css";

function EditProfile({ setProfilePicture }) {
    const { username, changeUsername, user_id , proPicture, changeProPicture} = useNavigation();
    const userSubmit = useRef("");
    const passSubmit = useRef("");
    const [newUser, setNewUser] = useState("");
    const [newPass, setNewPass] = useState("");
    const [profilePictureState, setProfilePictureState] = useState(null); // Local state for holding profile image
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
                const imageData = reader.result;
                setProfilePictureState(imageData); // Update local state
                setProfilePicture(imageData); // Update the profile picture in the parent (Profile)
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
                profile_picture: newProfilePic ? [`${newProfilePic}`] : null 
            };
    
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            };
    
            fetch('http://localhost/restapi/users.php', options)
            .then(async response => {
                const text = await response.text(); // Get raw text response
                //console.log('Raw response:', text);
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                return JSON.parse(text); // Parse JSON if no error
            })
            .then(data => {
                //console.log('Parsed response:', data);
                if (data.error) {
                    console.error('Server error:', data.error);
                } else {
                    console.log('Profile Updated Successfully!');
                    changeUsername(newUsername);
                    changeProPicture(newProfilePic)
                    window.location.reload();
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
            <button className="ImageChooser" onClick={handleFileButton}>Escolher Imagem</button>
            {profilePictureState && <img src={profilePictureState} alt="Preview" className="profileImagePreview" />}
            <button className="editButton"
                style={{ display: "block", margin: "auto" }} 
                onClick={() => changeUserName(user_id, newUser, newPass, profilePictureState)}
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
