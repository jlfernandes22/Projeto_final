import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { useNavigation } from "../NavigationContext";
import fotoProfile from "../Profile/Foto de Perfil.jpg"
import "./cssFolderProfile/profile.css"
import EditProfile from "../Definitions/EditProfile";
import ContentCreated from "../Definitions/ContentCreated";
import FriendList from "../Definitions/FriendList";
import goToFeed from "../Profile/dashboard.png"


function OtherProfiles() {

    const { navigate, username } = useNavigation()
    const usernameP = useRef()
    const [buttonView, setButtonView] = useState("")
    const escolhaDiv = useRef(null);


    useEffect(() => {
        if (escolhaDiv.current != null) {
            escolhaDiv.current.style.visibility = "hidden"
        }

    }, [username]);


    function escolha() {
        if (buttonView === "Amigos") {
            escolhaDiv.current.style.visibility = "visible"
            escolhaDiv.current.style.width = "250px"
            return <FriendList />
        } else if (buttonView === "Publicacoes") {
            escolhaDiv.current.style.visibility = "visible"
            escolhaDiv.current.style.width = "500px"
            return <ContentCreated />
        } else {

        }
    }

    return (

        <div className="containerProfile">
            <img className="goToFeedImg" src={goToFeed} onClick={() => {
                navigate("feed");
                window.location.reload();
            }} alt="" />
            <p className="profileName" ref={usernameP}>{username}</p>
            <img className="profileImg" src={fotoProfile} alt="" />
            <div className="buttons">
                <ul>
                    <li><button onClick={() => {
                    setButtonView("Amigos")
                }}>Amigos</button></li>
                    <li><button onClick={() => {
                    setButtonView("Publicacoes")
                }}>Publicações</button></li>
                </ul>
            </div>
            <div className="escolhaCerta" ref={escolhaDiv}>
                    {escolha()}
            </div>

        </div>
    );
}

export default OtherProfiles;