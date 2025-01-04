import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "../NavigationContext";
import "./content.css";

function Content() {

    const { navigate } = useNavigation()
    const [imageSrc, setImageSrc] = useState(null);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result); // Set the image preview
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="containerContent">
            <div className="contentWrapper">
                <textarea placeholder="A escrever..." className="submitText"></textarea>
                <div className={`imgPreview ${imageSrc ? "hasImage" : ""}`}>
                    {imageSrc ? (
                        <img
                            className="imgLoaded"
                            src={imageSrc}
                            alt="Preview"
                        />
                    ) : (
                        <span className="placeholderText">Image will appear here</span>
                    )}
                </div>
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
            />
            <button>Create New Content</button>
            <button onClick={() => {
                navigate("feed");
                window.location.reload()
            }}>Voltar Menu</button>



        </div>

    )

}

export default Content;