import React, {useState, useEffect, useRef} from "react";
import AddContent from "./AddContent";
import Upload from "./Upload";

function Content (){

    return(
        <>
            <AddContent/>
            <Upload/>
        </>
    );

}

export default Content;