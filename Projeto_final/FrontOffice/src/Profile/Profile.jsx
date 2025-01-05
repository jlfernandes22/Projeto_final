import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "../NavigationContext";
import defaultProfilePicture from "../Profile/anonymity.png"; // Default profile picture
import EditProfile from "../Definitions/EditProfile";
import ContentCreated from "../Definitions/ContentCreated";
import FriendList from "../Definitions/FriendList";
import goToFeed from "../Profile/dashboard.png";

function Profile() {
    const { navigate, username, user_id } = useNavigation(); // Assuming user_id is part of the context
    const usernameP = useRef();
    const [buttonView, setButtonView] = useState("");
    const escolhaDiv = useRef(null);
    const [allUsers, setAllUsers] = useState([]);
    const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

    useEffect(() => {
        getAllUsers();  // Fetch user data when the component mounts
        if (escolhaDiv.current != null) {
            escolhaDiv.current.style.visibility = "hidden";
        }
    }, []);

    useEffect(() => {
        if (allUsers.length > 0 && user_id) {
            const user = allUsers.find(user => user.id === user_id);
            console.log(user);
            if (user && user.profile_picture) {
                console.log(user.profile_picture)
                setProfilePicture(user.profile_picture); // Set the profile picture from the API
            } else {
                setProfilePicture(defaultProfilePicture); // Use default image if not available
            }
        }
    }, [allUsers, user_id]);

    // Function to fetch all users and update state
    function getAllUsers() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch("http://localhost/restapi/users.php", options)
            .then(response => response.json())
            .then(data => {
                setAllUsers(data);
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    }

    function escolha() {
        if (buttonView === "EditarPerfil") {
            escolhaDiv.current.style.visibility = "visible";
            escolhaDiv.current.style.width = "250px";
            return <EditProfile setProfilePicture={setProfilePicture} />;
        } else if (buttonView === "Amigos") {
            escolhaDiv.current.style.visibility = "visible";
            escolhaDiv.current.style.width = "250px";
            return <FriendList />;
        } else if (buttonView === "Publicacoes") {
            escolhaDiv.current.style.visibility = "visible";
            escolhaDiv.current.style.width = "500px";
            return <ContentCreated />;
        }
    }

    return (
        <div className="containerProfile">
            <img
                className="goToFeedImg"
                src={goToFeed}
                onClick={() => {
                    navigate("feed");
                    window.location.reload();
                }}
                alt=""
            />
            <p className="profileName" ref={usernameP}>{username}</p>
            <img className="profileImg" src={profilePicture} alt="Profile" />
            <div className="buttons">
                <ul>
                    <li>
                        <button onClick={() => setButtonView("EditarPerfil")}>Editar Perfil</button>
                    </li>
                    <li>
                        <button onClick={() => setButtonView("Amigos")}>Amigos</button>
                    </li>
                    <li>
                        <button onClick={() => setButtonView("Publicacoes")}>Publicações</button>
                    </li>
                </ul>
            </div>
            <div className="escolhaCerta" ref={escolhaDiv}>
                {escolha()}
            </div>
        </div>
    );
}

export default Profile;
