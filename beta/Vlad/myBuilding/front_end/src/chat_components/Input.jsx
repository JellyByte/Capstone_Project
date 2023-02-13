import React from 'react'
import Attach from "./img/attach.png";
import Img from "./img/Img.png";


export const Input = () => {
  return (
    <div className='h-1/6 p-2.5   font-mono'>


       
        <div className=' flex flex-row space-x-1 justify-around white cursor-pointer'>   

            <input
            type="text"

            class=" w-5/6 tracking-wider  border-none text-lg  focus:ring-0 placeholder:italic "
            placeholder="type something here... "
            />
            <div class="w-2/6 flex flex-row items-center justify-between space-x-2">
                <img className='w-6 h-6 rounded-md object-cover' src={Attach} />
                <input className="hidden" type="file" id='file' />
                <label htmlFor='file'>
                    <img className='w-6 h-6 object-cover' src={Img} />
                </label>
                <button className='w-14 h-10 tracking-wider text-sm bg-green-700 rounded-sm hover:bg-green-600'>send</button>
            </div>
        </div>
        
       
    
            
    </div>
  )
}
