import React from 'react'

import { Chat, Sidebar } from '../../chat_components';

export const Messages = () => {
 
  
  return (
    <div className=" border-cyan-400  max-h-fit max-w-screen flex justify-center items-center ">
      <div className=' w-full h-full flex '>
        {/*<Sidebar/> */} 
        {/*<Chat/> */} 
        {/*<Register/> */} 


       
        <div className="hidden md:block">
          <Sidebar  />

        </div>
      
       
        
     
        <Chat/>

        

      
    
    
        
      </div>
  </div>
    
  )
}

