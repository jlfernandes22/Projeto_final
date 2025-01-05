import React, { useState, useEffect } from "react";
import "./friendlist.css";
import { useNavigation } from "../NavigationContext";
import defaultProfilePicture from "./anonymity.png";

function FriendList() {
    const { user_id } = useNavigation();
    const [error, setError] = useState("");
    const [followed, setFollowed] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [view, setView] = useState("followed"); // State to toggle between followed and followers

    useEffect(() => {
        getAllFollowed(user_id);
        getAllFollowers(user_id);
        getAllUsers();
    }, [user_id]);

    useEffect(() => {
        console.log("All Users:", allUsers);
        console.log("Followed:", followed);
        console.log("Followers:", followers);
    }, [allUsers, followed, followers]);

    function getAllUsers() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch("http://localhost/restapi/users.php", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    setAllUsers(data);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }

    function getAllFollowed(id) {
        const jsonData = { user_id: Number(id) };
        const options = {
            method: "GET_FOLLOWED",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        };

        fetch("http://localhost/restapi/users.php", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    setFollowed(data);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }

    function getAllFollowers(id) {
        const jsonData = { user_id: Number(id) };
        const options = {
            method: "GET_FOLLOWERS",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        };

        fetch("http://localhost/restapi/users.php", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    setFollowers(data);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }

    // Function to render the list (either followed or followers)
    function renderList(list) {
        return list.map((item, index) => {
            const user = allUsers.find((user) => user.id === item.id);
            const userName = user ? user.name : `Unknown User (ID: ${item.id})`;
            const profilePicture = user?.profile_picture || defaultProfilePicture;

            return (
                <li key={index} className="FriendsList">
                    <img src={profilePicture} className="friends" alt="Profile" />
                    <p className="friendName">{userName}</p>
                </li>
            );
        });
    }

    if (!allUsers.length || (!followed.length && !followers.length)) {
        return <p>Loading friends...</p>;
    }

    return (
        <div>
            {/* Toggle buttons */}
            <div className="toggleButtons">
                <button
                    className={view === "followed" ? "active" : ""}
                    onClick={() => setView("followed")}
                >
                    A Seguir
                </button>
                <button
                    className={view === "followers" ? "active" : ""}
                    onClick={() => setView("followers")}
                >
                    Seguidores
                </button>
            </div>

            {/* Render the selected list */}
            <ul className="friendList">
                {view === "followed" && <p className="ASeguir">A Seguir</p>}
                {view === "followers" && <p className="Seguidores">Seguidores</p>}
                {view === "followed" && renderList(followed)}
                {view === "followers" && renderList(followers)}
            </ul>
        </div>
    );
}

export default FriendList;
