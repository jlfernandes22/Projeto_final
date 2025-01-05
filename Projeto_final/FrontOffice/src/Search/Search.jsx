import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "../NavigationContext";
import "./cssfolderSearch/search.css";
import backMenu from "./ImgSearch/dashboard.png";
import searchImg from "./ImgSearch/search.png";
import profileDefault from "./ImgSearch/anonymity.png"

function Search() {
    const { navigate,user_id } = useNavigation();
    const userAlvo = useRef(null); 
    const resultado = useRef(null);
    const imgResultado = useRef(null);
    const buttonSeguir = useRef(null);
    const buttonNaoSeguir =useRef(null);
    const [imgProfile, setImgProfile] = useState(null);
    const [users, setUsers] = useState([]); 
    const [searchInput, setSearchInput] = useState(''); 
    const [userFollow, setUserFollow] = useState(null);
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
                    
                    setUsers(data);
                }
            })
            .catch(error => { 
                console.error('Fetch error:', error);
            });
    }
    function follow(action, idFollower, idFollowed) {
        console.log("Entrou!!!");
        const jsonData = {action: action, follower_id: Number(idFollower), followed_id: Number(idFollowed)}

        const options = {
            method: 'FOLLOW',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        };

        fetch('http://localhost/restapi/users.php', options)
            .then(response => {
                console.log("Entrou2!!!")
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.error){
                    setError(data.error)
                }else{
                    setError("");
                    console.log(data)
                    console.log("Successfully followed!");
                }
            })
            .catch(error => { 
                console.error('Fetch error:', error);
            })
    }
    function unfollow(action, idFollower, idFollowed) {
        console.log("Entrou!!!");
        const jsonData = {action: action, follower_id: Number(idFollower), followed_id: Number(idFollowed)}

        const options = {
            method: 'UNFOLLOW',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        };

        fetch('http://localhost/restapi/users.php', options)
            .then(response => {
                console.log("Entrou2!!!")
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.error){
                    setError(data.error)
                }else{
                    setError("");
                    console.log(data)
                    console.log("Successfully unfollowed!");
                }
            })
            .catch(error => { 
                console.error('Fetch error:', error);
            })
    }
    
    function searchUser(user){
        
        for(let i=0;i<users.length;i++){
            
            if(users[i].name == user){
                imgResultado.current.style.display = "block"
                userAlvo.current.style.display = "block"                
                resultado.current.textContent = `${users[i].name}`;
                buttonSeguir.current.style.display = "block"
                buttonNaoSeguir.current.style.display = "block"
                setUserFollow(users[i].id);
                if(users[i].profile_picture == null){
                    setImgProfile(profileDefault);
                }else{
                    setImgProfile(users[i].profile_picture);
                }
                break;
            }
            imgResultado.current.style.display = "none"
            buttonSeguir.current.style.display = "none"
            buttonNaoSeguir.current.style.display = "none"
            userAlvo.current.style.display = "block"
            resultado.current.textContent = "Utilizador não encontrado";
        }
    }

    function clickToFollow(){
        if(userFollow !== Number(user_id)){
            follow("follow", user_id, userFollow);
        }else{
            console.log("nao podes seguir-te a ti mesmo!")
        }
    }
    function clickToUnfollow(){
        if(userFollow !== Number(user_id)){
            unfollow("unfollow", user_id, userFollow);
        }else{
            console.log("nao podes nao seguir-te a ti mesmo!")
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
                        placeholder="Insira um nome"
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
                <button ref={buttonSeguir} className="seguir" onClick={() => {
                    clickToFollow();
                }}>Seguir</button>
                <button ref={buttonNaoSeguir} className="Naoseguir" onClick={() =>{
                    clickToUnfollow();
                }}>Não Seguir</button>
            </div>
        </div>
    );
}

export default Search;