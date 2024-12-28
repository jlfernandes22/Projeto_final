import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigation } from "../NavigationContext";
import "./cssfolderMessages/cssfolderMessage.css"
import { imgArray } from "./ImgArray";
import arrowMessage from "/src/Messages/ImgMessages/social-media.png"
import goToFeed from "./ImgMessages/dashboard.png"

function Message() {

    const { navigate } = useNavigation();
    const [friends, setFriends] = useState([])

    useEffect(() => {
        setFriends(imgArray);
    }, [])

    return (
        <div className="containerMessage">
            <div className="containerForTitle">
            <img className="goToFeed" onClick={() => {
                navigate('feed')
                window.location.reload()
            }} src={goToFeed} alt="" />
            <p className="listadeAmigos" onClick={() => {
                    navigate("profile")
                    window.location.reload()}}>Lista de Amigos</p>
            </div>
            <ul>
                
                {friends.map((friend, index) => <li key={index}>
                    <img src={friend} onClick={() => {
                        navigate("profile")
                        window.location.reload()}} className="profile" alt={`User ${index}`} /><span>
                        Usuiasjdiasjdia {index}
                    </span>
                    <img className="arrow" onClick={() => {
                        navigate("specificmessage")
                        window.location.reload()}} src={arrowMessage} alt="" />
                    </li>)}
            </ul>
        </div>
    );
}

export default Message;