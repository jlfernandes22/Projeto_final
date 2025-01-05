import React, { useState, useEffect } from "react";
import defaultProfilePicture from "./Header/anonymity.png"
import "./cssfolderFeed/feed.css";

function Feed() {
    const [allUsers, setAllUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [allContent, setAllContent] = useState([]);
    const [error, setError] = useState("");

    // Fetch users on mount
    useEffect(() => {
        getAllUsers();
    }, []);

    // Fetch posts when allUsers is updated
    useEffect(() => {
        if (allUsers.length > 0) {
            getAllPosts();
        }
    }, [allUsers]); // Only run when allUsers is updated

    // Fetch posts when allContent is updated
    useEffect(() => {
        if (allContent.length > 0) {
            updatePostsWithContent();
        }
    }, [allContent]); // Only run when allContent is updated

    function showPosts(action, id) {
        const user_id = Number(id);
        const jsonData = { action, user_id };
        const options = {
            method: 'POSTS',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        };

        fetch('http://localhost/restapi/users.php', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json(); // Parse directly as JSON
            })
            .then(data => {
                if (Array.isArray(data)) {
                    // Update allContent only once per user, clearing previous content
                    setAllContent(prevContent => [
                        ...prevContent.filter(content => content.user_id !== user_id), // Remove previous content for the same user
                        { user_id, posts: data }
                    ]);
                } else {
                    // Handle the case when no posts are available
                    setAllContent(prevContent => [
                        ...prevContent.filter(content => content.user_id !== user_id), // Remove previous content for the same user
                        { user_id, posts: [] }
                    ]);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

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

    function getAllPosts() {
        // Ensure allContent is cleared before fetching
        setAllContent([]);

        // For each user, fetch posts and store the user_id and posts
        allUsers.forEach(user => {
            showPosts("fetch", user.id);
        });
    }

    function updatePostsWithContent() {
        let aux = [];

        // Add posts to aux only if there are posts
        allContent.forEach(content => {
            const { user_id, posts } = content;
            if (posts.length > 0) {
                // Add user_id only if posts are available
                aux.push(user_id);
                aux.push(...posts); // Add posts of the user
            }
        });

        setAllPosts(aux); // Update allPosts with the formatted array
    }

    return (
        <div className="feed">
            <ul className="feedList">
                {(() => {
                    let currentUserId = null;
    
                    return allPosts.map((item, index) => {
                        if (typeof item === "number") {
                            // Update the current user ID
                            currentUserId = item;
                            return null; // Skip rendering the user ID directly
                        }
                        if (typeof item === "object") {
                            // Find the user in the allUsers array
                            const user = allUsers.find(user => user.id === currentUserId);
                            const userNAME = user ? user.name : `Unknown User (ID: ${currentUserId})`;
                            // Render the post with the username
                            let foto = "";
                            if(user.profile_picture === null){
                                foto = defaultProfilePicture;
                            }else{
                                foto = user.profile_picture;
                            }
                            return (
                                <li key={index} className="Imagens">
                                    <img
                                        src={item.images[0]} // Assuming images is an array with at least one element
                                        className="postImg_feed"
                                    />
                                    <p className="postMessage">{item.caption}</p>
                                    <img src={foto} style={{width: "50px"}} alt="" />
                                    <p className="postUser">{userNAME}</p>
                                </li>
                            );
                        }
                        return null; // Fallback for unexpected data types
                    });
                })()}
            </ul>
        </div>
    );
}

export default Feed;
