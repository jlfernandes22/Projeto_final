import React, { useState, useContext, useEffect, useRef } from "react";
import defaultProfile from './Header/anonymity.png'; // Default profile picture
import message from './Header/comment.png';
import logout from './Header/exit_logout.png';
import "./cssfolderFeed/header.css";
import { useNavigation } from "../NavigationContext";

function Header() {
    const profileName = useRef();
    const { navigate, username, user_id } = useNavigation();
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState("");
    const [profilePicture, setProfilePicture] = useState(defaultProfile);

    useEffect(() => {
        getAllUsers();
        if (profileName.current != null) {
            profileName.current.textContent = `Welcome ${username}!`;
        }
    }, [username]);

    useEffect(() => {
        // Update the profile picture whenever allUsers or user_id changes
        if (allUsers.length > 0 && user_id) {
            const user = allUsers.find(user => user.id === user_id);
            if (user && user.profile_picture) {
                setProfilePicture(user.profile_picture);
            } else {
                setProfilePicture(defaultProfile); // Fallback to default picture
            }
        }
    }, [allUsers, user_id]);

    function getAllUsers() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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
                    setError(data.error);
                } else {
                    setError("");
                    setAllUsers(data);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    return (
        <>
            <div className="header">
                <img 
                    className="profile" 
                    onClick={() => {
                        navigate("profile");
                        window.location.reload();
                    }} 
                    src={profilePicture} 
                    alt="Profile" 
                    title="Profile" 
                />
                <span 
                    onClick={() => {
                        console.log(allUsers);
                    }} 
                    className="welcomeMessage" 
                    ref={profileName}
                >
                    Welcome!
                </span>
                <img 
                    className="message" 
                    onClick={() => {
                        navigate("messages");
                        window.location.reload();
                    }} 
                    src={message} 
                    alt="Message" 
                    title="Messages" 
                />
                <img 
                    className="logout" 
                    onClick={() => {
                        navigate("login");
                        window.location.reload();
                    }} 
                    src={logout} 
                    alt="Logout" 
                    title="Logout" 
                />
            </div>
        </>
    );
}

export default Header;
