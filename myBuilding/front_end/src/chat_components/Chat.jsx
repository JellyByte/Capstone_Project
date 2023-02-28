import React, { useState } from 'react'
import { Input } from './Input'
import { Messages } from './Messages'
import { ChatContext } from '../context/ChatContext'
import { useContext } from 'react'
import Hamburger from "./img/Hamburger.png"
import { Chats } from './Chats'
import { Searchbar } from './Searchbar'

export const Chat = () => {
  const {data} = useContext(ChatContext);
  const[showChats, setShowChats] = useState(false);

  return (
    <div className='w-full  h-full relative min-h-screen '    > {/* messages */}
        <div className=' bg-teal-700/90 h-16 px-2 py-5  grid grid-cols-2 items-center  text-white capitalize  sticky top-0'> {/*chat info */}
         
            <img 
            className=' md:invisible  p-1  w-8 h-8 rounded-md object-cover hover:bg-slate-200/20 ' 
            src={Hamburger}
            alt='Hamburger menu' 
            onClick={() => setShowChats(!showChats)} 
            
            />
          <span className='justify-self-start'>{data.user.displayName}</span>
      
        </div> 
       
        {showChats && 
    
        <div className='absolute top-15 left-0 right-0 bg-slate-200'>
               <Searchbar/>
             <div onClick={()=>setShowChats(!showChats)}>
               <Chats />
             </div>
         </div>
       
        }
     
        {!showChats &&
          <div>
            <div className='bg-gradient-to-t from-gray-300  overflow-hidden min-h-screen'>
              <Messages/>
            </div>
              <div className='sticky bottom-0 bg-white'>
                <Input />
              </div>
          </div>
        }
  
    </div>
  )
}
