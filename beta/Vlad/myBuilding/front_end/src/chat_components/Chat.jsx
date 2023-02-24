import React from 'react'
import { Input } from './Input'
import { Messages } from './Messages'
import { ChatContext } from '../context/ChatContext'
import { useContext } from 'react'

export const Chat = () => {
  const {data} = useContext(ChatContext);

  return (
    <div className='w-4/5 h-full relative min-h-screen '    > {/* messages */}
        <div className=' bg-teal-700/90 h-16 px-2 py-5 flex justify-center text-white capitalize n sticky top-0'> {/*chat info */}
            <span>{data.user?.displayName}</span>
              
        </div> 
        <div>
          <div className='bg-gradient-to-t from-gray-300  overflow-hidden min-h-screen'>

            <Messages/>
          </div>

           
            <div className='sticky bottom-0 bg-white'>

              <Input />
            </div>
        </div>

            
          

        
        
    </div>
  )
}
