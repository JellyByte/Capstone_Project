import React from 'react'
import { Input } from './Input'
import { Messages } from './Messages'

export const Chat = () => {
  return (
    <div className='w-3/5 '  > {/* messages */}
        <div className=' bg-teal-700/90 h-16 px-2 py-5 flex justify-center text-white capitalize '> {/*chat info */}
            <span>jane doe</span>
              
        </div> 
            <Messages/>
            <Input />
          

        
        
    </div>
  )
}
