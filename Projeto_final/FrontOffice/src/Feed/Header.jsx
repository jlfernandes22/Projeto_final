import React, { useState, useContext, useEffect, useRef, createContext } from "react";
import profile from './Header/Foto de Perfil.jpg';
import message from './Header/comment.png';
import logout from './Header/exit_logout.png';
import "./cssfolderFeed/header.css"
import { useNavigation } from "../NavigationContext";

function Header() {

    const profileName = useRef();
    const {navigate, username, user_id} = useNavigation();

    useEffect(() => {
        if(profileName.current != null){
            profileName.current.textContent = `Welcome ${username}!`;
        }
        console.log(user_id);
    }, [username])

    return (
        
        <>
            <div className="header">
                <img className="profile" onClick={() => {
                    navigate("profile")
                    window.location.reload()}} 
                    src={profile} alt="Profile" title="Profile"/>
                <span className="welcomeMessage" ref={profileName}>Welcome!</span>
                <img className="message" onClick={() => {
                    navigate("messages")
                    window.location.reload()}} 
                    src={message} alt="Message" title="Messages"/>
                <img className="logout" onClick={() => {
                    navigate("login");
                    window.location.reload();
                }} src={logout} alt="Logout" title="Logout"/>
            </div>
            
        </>
    );
}



export default Header;