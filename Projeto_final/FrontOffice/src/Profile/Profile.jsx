import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { useNavigation } from "../NavigationContext";
import fotoProfile from "../Profile/Foto de Perfil.jpg"
import "./cssFolderProfile/profile.css"
import EditProfile from "../Definitions/EditProfile";

function Profile() {

    const { navigate, username } = useNavigation()
    const usernameP = useRef()
    const [buttonView, setButtonView] = useState("")

    return (
        <div className="containerProfile">
            <p className="profileName" ref={usernameP}>{username}</p>
            <img className="profileImg" src={fotoProfile} alt="" />
            <div className="buttons">
                <button onClick={() => {
                    setButtonView("EditProfile")
                }}>Editar Perfil</button>
                <button onClick={() => {
                    navigate("feed")
                    window.location.reload()
                }}>Definições</button>
                <button onClick={() => {
                    navigate("feed")
                    window.location.reload()
                }}>Amigos</button>
                <button onClick={() => {
                    navigate("feed")
                    window.location.reload()
                }}>Publicações</button>
            </div>
            <>
                {buttonView === "EditProfile" && < EditProfile/>}
            </>
        </div>
    );
}

export default Profile;