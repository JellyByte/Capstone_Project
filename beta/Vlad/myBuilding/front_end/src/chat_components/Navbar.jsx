import React from 'react'

export const Navbar = () => {
  return (
    <div className="flex items-center bg-teal-800 h-16 p-2 justify-between text-white ">
        <span className=" font-mono"> myBuilding </span>
        <div className='flex gap-3'>
            <img  className= 'bg-black h-6 w-6 rounded-sm overflow-hidden object-cover' src=" https://images.pexels.com/photos/9427363/pexels-photo-9427363.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load "></img>
            <span className=' font-mono  text-sm'>John</span>
            <button
                type="button"
                className="inline-block px-4 py-2 bg-fuchsia-900 text-white text-sm capitalize rounded  hover:bg-pink-900  ">
                Log out
            </button>

        </div>
        
        
    </div>
  )
}
