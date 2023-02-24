import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth";
import { Chat, Sidebar } from '../chat_components';

export const Messages = () => {
  //et navigate = useNavigate();
  //const[user] = useAuthState(auth)

//   useEffect(() => {

//       if (user) {
//           navigate('/messaging')
//       }

//       if (!user) {
//           navigate('/login')
//       }
//   }, [])
  
  return (
    <div className="border-2 rounded-lg border-cyan-400  max-h-fit max-w-screen flex justify-center items-center ">
    <div className='border-2 rounded-lg border-cyan-400 w-full h-full flex '>
        {/*<Sidebar/> */} 
        {/*<Chat/> */} 
        {/*<Register/> */} 
        <Sidebar/>
        <Chat/>
    
    
        
    </div>
  </div>
    
  )
}

