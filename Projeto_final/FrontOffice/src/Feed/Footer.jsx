import React, { useState, useContext, useRef, useEffect, createContext } from "react";
import mainMenu from './Footer/dashboard.png'
import addContent from './Footer/add-video.png'
import search from './Footer/search.png'
import "./cssfolderFeed/footer.css"
import { useNavigation } from "../NavigationContext";



function Footer() {

    useEffect(() => {
    }, [])

    const {navigate} = useNavigation()

    return (
        <div className="footer">
            <img className="mainMenu" onClick={() => {
                navigate("feed")
                window.location.reload()
            }} src={mainMenu} alt="" />
            <img className="addContent" onClick={() => {
                navigate("addcontent");
                window.location.reload();
            }} src={addContent} alt="" />
            <img onClick={() => {
                navigate("search")
                window.location.reload();
            }} className="search" src={search} alt="" />
        </div>
    );
}

export default Footer;