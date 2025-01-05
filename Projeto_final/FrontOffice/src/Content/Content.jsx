import React, { useState, useEffect, useRef, act } from "react";
import { useNavigation } from "../NavigationContext";
import "./content.css";
import backMenu from "./dashboard.png"

function Content() {

    const { navigate, user_id } = useNavigation()
    const [imageSrc, setImageSrc] = useState(null);
    const [captionPost, setCaptionPost] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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

    function createPost(action, id, caption, imgCerto) {
        if (caption !== "" || imgCerto !== null) {
            const images = [imgCerto];
            const user_id = Number(id);

            const jsonData = { action, user_id, caption, images };
            console.log(jsonData);
            const options = {
                method: 'POSTS',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            };

            fetch('http://localhost/restapi/users.php', options)
                .then(response => {
                    console.log("Raw Response:", response);
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(text => {
                    console.log("Response Text:", text);
                    try {
                        const data = JSON.parse(text); // Parse text to JSON
                        navigate("feed");
                        window.location.reload();
                        if (data.error) {
                            setErrorMessage(data.error);
                        }
                    } catch (err) {
                        console.error("JSON Parse Error:", err);
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }else{
            console.log("Entrou");
        }
    }



    const handleFileButton = () => {
        file.current.click();
    }


    return (
        <div className="containerContent">
            <p className="criarPost">Criar Post</p>
            <div className="contentWrapper">
                <textarea maxLength={100} placeholder="A escrever..." onChange={e => setCaptionPost(e.target.value)} className="submitText"></textarea>
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
            <ul style={{ listStyle: "none" }}>
                <li><button className="chooseFile" onClick={handleFileButton}>Adicionar Imagem</button></li>
                <li><button className="postpost" onClick={() => createPost("create", user_id, captionPost, imageSrc)}>Publicar Post</button></li>
                <li><img className="backToFeedMenu" src={backMenu} alt="VoltarFeed" onClick={() => {
                    navigate("feed");
                    window.location.reload();
                }} /></li>
            </ul>
            <input ref={file} className="chooseFile"
                type="file"
                accept="image/*"
                onChange={handleImageUpload} style={{ display: "none" }} />
        </div>

    )

}

export default Content;