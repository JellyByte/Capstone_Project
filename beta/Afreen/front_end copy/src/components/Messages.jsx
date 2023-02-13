import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from '../MessagingComponents/Chat';
import Sidebar from '../MessagingComponents/Sidebar' 
import Input from '../MessagingComponents/Input' 

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
    <div className='messageContainer'>
      <div className="wrapper">
      <Sidebar/>
      <Chat/>
      
      </div>
    </div>
  )
}

