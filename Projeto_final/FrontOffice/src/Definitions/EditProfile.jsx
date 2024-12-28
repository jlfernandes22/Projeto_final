import React, {useState, useEffect} from "react";
import { useNavigation } from "../NavigationContext";

function EditProfile(){

    const { username } = useNavigation()

    useEffect(() => {
           
        }, [username])

    return(
        <div className="container">
            <p>Alterar o Nome</p>
        </div>
    );
}

export default EditProfile;