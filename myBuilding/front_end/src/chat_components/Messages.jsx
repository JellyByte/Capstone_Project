import React, { useState,useContext, useEffect } from 'react'
import { Message } from './Message'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { AuthContext } from '../context/AuthContext';

export const Messages = () => {
  const [messages,setMessages] = useState([]);
  const {data} = useContext(ChatContext);
  const{setLoading} = useContext(AuthContext);
  
  //setLoading(true);
  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats", data.chatId), (doc) =>{
      doc.exists() && setMessages(doc.data().messages);
      return ()=>{
        unSub();
      }

    })
    
  },[data.chatId])
  //setLoading(false);
  //console.log(messages)
  

  return (

    <div className=' h-5/6 overflow-y-scroll'> {/*messages */}
        {messages.map(m=>(

          <Message message={m} key={m.id}/>


        ))}
        

    </div>
  )
}
