import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "../NavigationContext";
import "./cssfolderSearch/search.css"
import backMenu from "./ImgSearch/dashboard.png"
import searchImg from "./ImgSearch/search.png"


function Search() {



    return (
        <div className="containerSearch">
            <ul>
                <li><img src={backMenu} onClick={() => {
                    navigate("feed");
                    window.location.reload();
                }} alt="" /></li>
                <li><p>Pesquise</p>
                    <input type="text" name="" id="" />
                </li>
                <li><img src={searchImg} alt="" /></li>
            </ul>
            <div className="pesquisa" >
                
            </div>
        </div>
    );
}

export default Search