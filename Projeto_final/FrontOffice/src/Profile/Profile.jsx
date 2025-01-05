import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "../NavigationContext";
import defaultProfilePicture from "../Profile/anonymity.png"; // Default profile picture
import "./cssFolderProfile/profile.css";
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
        getAllUsers();
        if (escolhaDiv.current != null) {
            escolhaDiv.current.style.visibility = "hidden";
        }
    }, []);

    useEffect(() => {
        if (allUsers.length > 0 && user_id) {
            const user = allUsers.find(user => user.id === user_id);
            if (user && user.profile_picture) {
                setProfilePicture(user.profile_picture);
            } else {
                setProfilePicture(defaultProfilePicture);
            }
        }
    }, [allUsers, user_id]);

    function getAllUsers() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch("http://localhost/restapi/users.php", options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
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
            return <EditProfile />;
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
                        <button
                            onClick={() => {
                                setButtonView("EditarPerfil");
                            }}
                        >
                            Editar Perfil
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setButtonView("Amigos");
                            }}
                        >
                            Amigos
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setButtonView("Publicacoes");
                            }}
                        >
                            Publicações
                        </button>
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
