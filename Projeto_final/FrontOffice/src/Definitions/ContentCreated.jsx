import React, {useState, useEffect} from "react";
import { imgArray } from "../Definitions/ImgArray";
import "./contentcreated.css";


function ContentCreated() {
    const [content, setContent] = useState([])

    useEffect(() => {
        setContent(imgArray);
    }, [])


    return (
        <ul className="contentList">

            {content.map((friend, index) => <li key={index}>
                <img src={friend} className="postImg" alt={`Post ${index}`} />
                <p className="postMessage">Usuiasjdiasj {index}</p>
            </li>)}
        </ul>
    );
}

export default ContentCreated;