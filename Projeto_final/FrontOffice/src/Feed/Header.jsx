import React, { useState, useContext, useEffect, useRef, createContext } from "react";
import profile from './Header/Foto de Perfil.jpg';
import message from './Header/comment.png';
import logout from './Header/exit_logout.png';
import "./cssfolderFeed/header.css"
import { useNavigation } from "../NavigationContext";
import { getUsername } from "../Login/SignInForm";

function Header() {

    const profileName = useRef();
    const {navigate, username} = useNavigation();

    useEffect(() => {
        if(profileName.current != null){
            profileName.current.textContent = `Welcome ${username}!`;
        }
    }, [username])

    return (
        
        <>
            <div className="header">
                <img className="profile" onClick={() => {
                    navigate("profile")
                    window.location.reload()}} 
                    src={profile} alt="Profile" title="Profile"/>
                <span className="welcome" ref={profileName}>Welcome!</span>
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