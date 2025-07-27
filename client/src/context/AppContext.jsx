import { createContext } from "react";
export const AppContent = createContext()
export const Appcontextprovider =(props)=>{
    const value={

    }
    return(
        <AppContent.Provider value={value}>
            {props.children}</AppContent.Provider>
        
    )
}