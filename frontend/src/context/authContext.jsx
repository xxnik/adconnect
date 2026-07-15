import {createContext,useState,useEffect,} from "react";
import api from "../api/api";

    export const AuthContext=createContext();   

    export function AuthProvider({children}){
        const [user,setUser]=useState(null);
        const [loading, setLoading] = useState(true);


        useEffect(() => {
            const fetchUser=async()=>{
                const token=localStorage.getItem("token");

                if(!token){
                    setLoading(false);
                    return;
                }

                try{
                    const response=await api.get("/auth/me",{
                        headers:{
                            Authorization :`Bearer ${token}`,
                        },
                    });
                    setUser(response.data.user);

                }catch(error){
                    localStorage.removeItem("token");
                }

                 setLoading(false);
            };

            fetchUser();
            
        }, []);
        return(
            <AuthContext.Provider value={{user,setUser,loading}}>
                {children}
            </AuthContext.Provider>
        )
    }