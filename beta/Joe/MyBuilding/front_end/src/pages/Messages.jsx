import React from 'react'
import Chat from '../MessagingComponents/Chat';
import Sidebar from '../MessagingComponents/Sidebar' 
import Input from '../MessagingComponents/Input' 
const Messages = () => {
  return (
    <div className='messageContainer'>Container
      <div className="wrapper">Wrapper
      <Chat/>
      <Sidebar/>
      <Input/>
      </div>
    </div>
  
  )
}

export default Messages