import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "../NavigationContext";
import "./cssfolderSearch/search.css";
import backMenu from "./ImgSearch/dashboard.png";
import searchImg from "./ImgSearch/search.png";
import profileDefault from "./ImgSearch/anonymity.png"

function Search() {
    const { navigate } = useNavigation();
    const userAlvo = useRef(null); 
    const resultado = useRef(null);
    const imgResultado = useRef(null);
    const [imgProfile, setImgProfile] = useState(null);
    const [users, setUsers] = useState([]); 
    const [searchInput, setSearchInput] = useState(''); 
    const [error, setError] = useState(''); 

    useEffect(() => {
        getAllUsers();
    },[])

    
    function getAllUsers() {        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch('http://localhost/restapi/users.php', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setError("");
                    console.log(data);
                    setUsers(data);
                }
            })
            .catch(error => { 
                console.error('Fetch error:', error);
            });
    }
    
    function searchUser(user){
        
        for(let i=0;i<users.length;i++){
            
            if(users[i].name == user){
                console.log(users[i].name)
                console.log(user);
                imgResultado.current.style.display = "block"
                userAlvo.current.style.display = "block"
                resultado.current.textContent = `${users[i].name}`;
                if(users[i].profile_picture == null){
                    setImgProfile(profileDefault);
                }else{
                    setImgProfile(users[i].profile_picture);
                }
                break;
            }
            userAlvo.current.style.display = "block"
            resultado.current.textContent = "Utilizador não encontrado";
        }
    }


    return (
        <div className="containerSearch">
            <ul>
                <li>
                    <img
                        src={backMenu}
                        onClick={() => {
                            navigate("feed");
                            window.location.reload();
                        }} className="defaultImg"
                        alt=""
                    />
                </li>
                <li>
                    <p>Pesquise</p>
                    <input className="submitUser"
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Enter username"
                    />
                </li>
                <li>
                    <img src={searchImg} onClick={() => {
                        searchUser(searchInput);
                    }} alt="Search" className="defaultImg"/>
                </li>
            </ul>
            <div className="pesquisa" ref={userAlvo}>
                <img ref={imgResultado} className="profileImage" src={imgProfile} alt="" />
                <p className="pesquisaResultado" ref={resultado}></p>
            </div>
        </div>
    );
}

export default Search;