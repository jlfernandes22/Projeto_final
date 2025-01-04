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
    return(
        <NavigationContext.Provider value={{page, navigate, username, changeUsername, user_id, changeUserID}}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation(){
    return useContext(NavigationContext);
}
