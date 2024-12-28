import React, {useState, createContext, useContext} from "react";

const NavigationContext = createContext();

export function NavigationProvider({children}){
    const [page, setPage] = useState(() => {
        return localStorage.getItem("currentPage") || 'login'});
    const navigate = (newPage) => {
        setPage(newPage);
        localStorage.setItem("currentPage", newPage)}
    
    const username = localStorage.getItem("username") || '';
    return(
        <NavigationContext.Provider value={{page, navigate, username}}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation(){
    return useContext(NavigationContext);
}
