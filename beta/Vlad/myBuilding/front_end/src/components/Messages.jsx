import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth";

export const Messages = () => {
  let navigate = useNavigate();
  const[user] = useAuthState(auth)

  useEffect(() => {

      if (user) {
          navigate('/messaging')
      }

      if (!user) {
          navigate('/login')
      }
  }, [])
  
  return (
    <div>Messages</div>
  )
}

