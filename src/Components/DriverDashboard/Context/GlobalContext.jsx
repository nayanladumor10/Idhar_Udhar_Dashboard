// Context/GlobalContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'

const GlobalContextt = createContext();

export const GlobalContext = ({children}) => {
    const [globalstate, setGlobalstate] = useState({
        Isonline: false,
        Issidebar: true,
    });

    const ToggleOnline = () => {
        setGlobalstate(prev => ({
            ...prev,
            Isonline: !prev.Isonline
        }));
    }


    const ToggleSidebar = () => {
        setGlobalstate(prev => ({
            ...prev,
            Issidebar: !prev.Issidebar
        }));
    }

    return (
        <GlobalContextt.Provider value={{...globalstate, ToggleOnline, ToggleSidebar}}>
            {children}
        </GlobalContextt.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContextt);
}