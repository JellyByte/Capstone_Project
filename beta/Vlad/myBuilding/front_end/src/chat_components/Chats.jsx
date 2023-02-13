import React from 'react'

export const Chats = () => {
  return (
    <div>
        <div className='p-2 flex justify-start gap-3 cursor-pointer mono  hover:bg-gray-600'>{/*userchat */}
            <img className='w-14 h-14 rounded-md object-cover' src = "https://images.pexels.com/photos/9427363/pexels-photo-9427363.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"></img>
            <div className='userChatInfor'>{/*userchat info */}
                <span className=' text-base  capitalize'>jane doe</span>
                <p className='text-sm italic text-gray-300 lowercase'  >Hello There</p>

            </div>
        </div>
        <div className='p-2 flex justify-start gap-3 cursor-pointer mono  hover:bg-gray-600'>{/*userchat */}
            <img className='w-14 h-14 rounded-md object-cover' src = "https://images.pexels.com/photos/9427363/pexels-photo-9427363.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"></img>
            <div className='userChatInfor'>{/*userchat info */}
                <span className=' text-base capitalize'>jane doe</span>
                <p className='text-sm italic text-gray-300 lowercase ' >Hello There</p>

            </div>
        </div>
        <div className='p-2 flex justify-start gap-3 cursor-pointer mono  hover:bg-gray-600'>{/*userchat */}
            <img className='w-14 h-14 rounded-md object-cover' src = "https://images.pexels.com/photos/9427363/pexels-photo-9427363.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"></img>
            <div className='userChatInfor'>{/*userchat info */}
                <span className=' text-base capitalize'>jane doe</span>
                <p className='text-sm italic text-gray-300 lowercase ' >Hello There</p>

            </div>
        </div>
    </div>

  )
}
