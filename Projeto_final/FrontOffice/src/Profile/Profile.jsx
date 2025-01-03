import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { useNavigation } from "../NavigationContext";
import fotoProfile from "../Profile/Foto de Perfil.jpg"
import "./cssFolderProfile/profile.css"
import EditProfile from "../Definitions/EditProfile";
import ContentCreated from "../Definitions/ContentCreated";
import FriendList from "../Definitions/FriendList";
import goToFeed from "../Profile/dashboard.png"


function Profile() {

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
        if (buttonView === "EditarPerfil") {
            escolhaDiv.current.style.visibility = "visible"
            return <EditProfile />
        } else if (buttonView === "Amigos") {
            escolhaDiv.current.style.visibility = "visible"
            return <FriendList />
        } else if (buttonView === "Publicacoes") {
            escolhaDiv.current.style.visibility = "visible"
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
                    setButtonView("EditarPerfil")
                }}>Editar Perfil</button></li>
                    <li><button onClick={() => {
                    setButtonView("Amigos")
                }}>Amigos</button></li>
                    <li><button onClick={() => {
                    setButtonView("Publicacoes")
                }}>Publicações</button></li>
                    <li><div className="escolha" ref={escolhaDiv}>
                    {escolha()}
                </div></li>
                </ul>
            </div>

        </div>
    );
}

export default Profile;