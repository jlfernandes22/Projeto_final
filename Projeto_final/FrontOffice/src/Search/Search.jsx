import React from "react";
import { useNavigation } from "../NavigationContext";
import "./cssfolderSearch/search.css"
import backMenu from "./ImgSearch/dashboard.png"
import searchImg from "./ImgSearch/search.png"


function Search() {

    const { navigate } = useNavigation();

    return (
        <div className="containerSearch">
            <img src={backMenu} alt="feed" />
            <input type="text" className="searchAccount" name="" id="" />
            <img src={searchImg} alt="search" />
            <p onClick={() => {
                navigate("feed")
                window.location.reload();
            }}>ola</p>
        </div>
    );
}

export default Search