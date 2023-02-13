import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth";
import { Chat, Sidebar } from '../chat_components';

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
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex justify-center items-center ">
    <div className='border-2 rounded-lg border-cyan-400 w-192 h-192 flex overflow-hidden'>
        {/*<Sidebar/> */} 
        {/*<Chat/> */} 
        {/*<Register/> */} 
        <Sidebar/>
        <Chat/>
    
    
        
    </div>
</div>
    
  )
}

