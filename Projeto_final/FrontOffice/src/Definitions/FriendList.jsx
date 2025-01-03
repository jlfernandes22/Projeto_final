import React, {useState, useEffect} from "react";
import { imgArray } from "../Messages/ImgArray";
import "./friendlist.css";

function FriendList() {

    const [friends, setFriends] = useState([])

    useEffect(() => {
        setFriends(imgArray);
    }, [])

    return (
                    <ul className="friendList">
                        
                        {friends.map((friend, index) => <li key={index}>
                            <img src={friend} className="friends" alt={`User ${index}`} />
                                <p className="friendName">Usuiasjdiasj {index}</p>
                            </li>)}
                    </ul>
    );
}

export default FriendList;