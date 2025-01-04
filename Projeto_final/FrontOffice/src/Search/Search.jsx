import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "../NavigationContext";
import "./cssfolderSearch/search.css";
import backMenu from "./ImgSearch/dashboard.png";
import searchImg from "./ImgSearch/search.png";

function Search() {
    const { navigate } = useNavigation();
    const userAlvo = useRef(null); 
    const resultado = useRef(null);
    const imgResultado = useRef(null);
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
                userAlvo.current.style.display = "block"
                resultado.current.textContent = `${users[i].name}`;
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
                        }}
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
                    }} alt="Search" />
                </li>
            </ul>
            <div className="pesquisa" ref={userAlvo}>
                <img ref={imgResultado} src="" alt="" />
                <p className="pesquisaResultado" ref={resultado}>ola</p>
            </div>
        </div>
    );
}

export default Search;