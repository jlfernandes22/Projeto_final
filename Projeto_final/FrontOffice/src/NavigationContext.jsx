import React, {useState, createContext, useContext} from "react";

const NavigationContext = createContext();

export function NavigationProvider({children}){
    const [page, setPage] = useState(() => {
        return localStorage.getItem("currentPage") || 'login'});
    const navigate = (newPage) => {
        setPage(newPage);
        localStorage.setItem("currentPage", newPage)}
    
    const [username,setUsername] = useState(() => {
        return localStorage.getItem("username") || ''})
    const changeUsername = (newUsername) => {
        setUsername(newUsername);
        localStorage.setItem("username",newUsername);
    }

    const [user_id, setUser_Id] = useState(() => {
        return localStorage.getItem("user_id") || ''});
    const changeUserID = (newUserID) => {
        setUser_Id(newUserID);
        localStorage.setItem("user_id",newUserID);
    }
    const [proPicture, setProPicture] = useState(() => {
        return localStorage.getItem("proPicture") || ''});
    const changeProPicture = (newProPicture) => {
        setProPicture(newProPicture);
        localStorage.setItem("proPicture",newProPicture);
    }
    return(
        <NavigationContext.Provider value={{page, navigate, username, changeUsername, user_id, changeUserID, proPicture, changeProPicture}}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation(){
    return useContext(NavigationContext);
}
