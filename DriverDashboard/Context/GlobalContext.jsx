// Context/GlobalContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'

const GlobalContextt = createContext();

export const GlobalContext = ({children}) => {
      const [user,setuser] = useState({});

      useEffect(()=>{
        let Tempuser = localStorage.getItem("idharUdharUser")
        const parsedUser = JSON.parse(Tempuser);
        setuser(parsedUser)
      },[])

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

    const UpdateUser = (newuserdata)=>{
       setuser(newuserdata)
       localStorage.setItem('idharUdharUser', JSON.stringify(user));
    }

    return (
        <GlobalContextt.Provider value={{...globalstate, ToggleOnline, ToggleSidebar,user}}>
            {children}
        </GlobalContextt.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContextt);
}