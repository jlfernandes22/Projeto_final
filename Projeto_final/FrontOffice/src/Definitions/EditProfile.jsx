import React, {useState, useEffect} from "react";
import { useNavigation } from "../NavigationContext";
import "./editprofile.css"

function EditProfile(){

    const { username, changeUsername} = useNavigation()

    useEffect(() => {
           
        }, [username])

    return(
        <div className="containerEditProfile">
            <p>Alterar Nome</p>
            <input type="text" name="" id="" />
            <button>Alterar</button>
        </div>
    );
}

export default EditProfile;