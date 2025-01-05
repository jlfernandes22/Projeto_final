import React, { useState, useEffect } from "react";
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

        console.log("Updated posts array:", aux);
        setAllPosts(aux); // Update allPosts with the formatted array
    }

    return (
        <div className="feed">
            <ul>
            {(() => {
          let currentUserId = null;

          return allPosts.map((item, index) => {
            if (typeof item === "number") {
              // Update the current user ID
              currentUserId = item;
              return null; // Skip rendering user_id directly
            }
            if (typeof item === "object") {
              // Render the post with the current user ID
              return (
                <li key={index}>
                  <img
                    src={item.images[0]} // Assuming images is an array with at least one element
                    className="postImg"
                    alt={`Post ${index}`}
                  />
                  <p className="postMessage">{item.caption}</p>
                  <p className="postUser">Published by user ID: {currentUserId}</p>
                </li>
              );
            }
            return null; // Fallback in case of unexpected data types
          });
        })()}
            </ul>
        </div>
    );
}

export default Feed;
