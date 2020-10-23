import React, { createContext, useState } from 'react'
import fetchApi from '../config/config';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext([
    {},
    ()=>{}
]);

const token = JSON.parse(localStorage.getItem('token'));
const deoc = decode(token.accesstoken);
const checkToken=()=>{
    return Promise((resolve,reject)=>{
        (deoc.payload.exp-current < 0){
            refreshToken(refreshToken){refreshToken+accesstoken}
        }
        resolve()
        if(reject()){
            logout()
        }
    })
}

export const AuthProvider =({children})=>{
    
    const [login,setLogin] = useState(AuthContext)
    return(
      <AuthContext.Provider value={[login,setLogin]}>
        {()=>{
            if(login) return children
            else return <div>error</div>
        }}
      </AuthContext.Provider>
    )
}