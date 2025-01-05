import React, {useState, useEffect} from "react";
import { imgArray } from "../Definitions/ImgArray";
import "./contentcreated.css";
import { useNavigation } from "../NavigationContext";


function ContentCreated() {
    const [content, setContent] = useState([])
    const [allContent, setAllContent] = useState([]);
    const {user_id} = useNavigation();

    useEffect(() => {
        createPost("fetch", user_id);
    }, [])

    function createPost(action, id) {
        const user_id = Number(id);
        const jsonData = { action, user_id };
        const options = {
            method: 'POSTS', // Fix method typo ('POSTS' -> 'POST')
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
                console.log("Parsed Response Data:", data);
                if (Array.isArray(data)) {
                    setAllContent(data); // Only set if the response is an array
                } else {
                    console.error("Response is not an array:", data);
                    setAllContent([]); // Fallback to empty array
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setAllContent([]); // Handle errors gracefully
            });
    }
    

    return (
        <ul className="contentList">

            {allContent.map((post, index) => <li key={index}>
                <img src={post.images} className="postImg"  />
                <p className="postMessage">{post.caption}</p>
            </li>)}
        </ul>
    );
}

export default ContentCreated;