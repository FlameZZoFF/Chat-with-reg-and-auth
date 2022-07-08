import { Navigate } from "react-router-dom";
import {auth} from '../firebase/firebase-config'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
export default function RequireAuth({children}) {
    const [authcheck,setAuthCheck] = useState(false)
    const [user,setUser] = useState({})
    useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
      if (!user){
        setAuthCheck(true)
      } else{
        setAuthCheck(false)
      }
    })
  })
   
    if(authcheck) {
        return <Navigate to = '/SignIn'  />
    }else{
      return children;
    }
}
