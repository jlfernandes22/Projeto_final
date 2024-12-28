import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "../NavigationContext";
import "./cssfolderContent/addcontent.css"

function AddContent() {

    const { navigate } = useNavigation()

    return (
    <div className="containerContent">
        <textarea name="" id="" className="submitText"></textarea>
        <button onClick={() => {
            navigate("feed");
            window.location.reload()
        }}>addcontent</button>
        


    </div>

    )
}

export default AddContent;