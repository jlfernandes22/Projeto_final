import React, {useState, useRef, useEffect} from "react";
import { useNavigation } from "../NavigationContext";


function SpecificMessage(){

    const {navigate} = useNavigation();

    return(
        <p onClick={() => {
            navigate("feed");
        }}>ofkdd</p>
    );
}

export default SpecificMessage;