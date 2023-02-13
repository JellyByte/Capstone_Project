import React from 'react'

export const Searchbar = () => {
  return (
    <div >    {/*search */}
        <div class="flex justify-center m-1">
            <div class=" xl:w-96">
                <div class="input-group relative w-full ">
                <input 
                        type="search" 
                        class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        placeholder="Search" 
                        aria-label="Search"    
                    />
                </div>
            </div>
        </div>


            <div className='p-2 flex justify-start gap-3 cursor-pointer mono  text-base hover:bg-gray-600'>{/*userchat */}
                <img className='w-14 h-14 rounded-md object-cover' src = "https://images.pexels.com/photos/9427363/pexels-photo-9427363.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"></img>
                <div className='userChatInfor'>{/*userchat info */}
                    <span>jane</span>

                </div>
            </div>
     
        </div>
  )
}
