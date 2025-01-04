import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "../NavigationContext";
import "./content.css";
import backMenu from "./dashboard.png"

function Content() {

    const { navigate } = useNavigation()
    const [imageSrc, setImageSrc] = useState(null);
    const file = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileButton = () => {
        file.current.click();
    }

    return (
        <div className="containerContent">
            <p className="criarPost">Criar Post</p>
            <div className="contentWrapper">
                <textarea maxLength={350} placeholder="A escrever..." className="submitText"></textarea>
                <div className={`imgPreview ${imageSrc ? "hasImage" : ""}`}>
                    {imageSrc ? (
                        <img
                            className="imgLoaded"
                            src={imageSrc}
                            alt="Preview"
                        />
                    ) : (
                        <span className="placeholderText">Imagem vai aparecer aqui</span>
                    )}
                </div>
            </div>
            <ul style={{listStyle: "none"}}>
                <li><button className="chooseFile" onClick={handleFileButton}>Adicionar Imagem</button></li>
                <li><button className="chooseFile">Publicar Post</button></li>
                <li><img className="backToFeedMenu" src={backMenu} alt="VoltarFeed" onClick={() => {
                    navigate("feed");
                    window.location.reload();
                }}/></li>
            </ul>
            <input ref={file} className="chooseFile"
                type="file"
                accept="image/*"
                onChange={handleImageUpload} style={{display: "none"}}/>
        </div>

    )

}

export default Content;