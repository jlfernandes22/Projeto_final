import React, { useState, useEffect } from "react";
import { imgArray } from "../Messages/ImgArray";
import "./friendlist.css";

function FriendList() {
    const [error, setError] = useState("");
    const [friends, setFriends] = useState([])
    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        getAllFollowed();
    }, [])

    useEffect(() => {
        // Update the profile picture whenever allUsers or user_id changes
        if (allUsers.length > 0 && user_id) {
            if (proPicture) {
                setProfilePicture(proPicture); // Set the profile picture from the API
            } else {
                setProfilePicture(defaultProfilePicture); // Use default image if not available
            }

        }
    }, [allUsers, user_id]);


    function getAllFollowed(id) {
        const jsonData = {id: Number(id)};
        const options = {
            method: 'GET_FOLLOWED',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
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
                    setFriends(data);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }


    return (
        <ul className="friendList">

            {friends.map((friend, index) => <li key={index}>
                <img src={friend.profile_picture} className="friends" alt={`User ${index}`} />
                <p className="friendName">Usuiasjdiasj {index}</p>
            </li>)}
        </ul>
    );
}

export default FriendList;