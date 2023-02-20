import React from 'react'

const isOwner = false;

export const Message = () => {
  return (
    <div className={`font-mono flex gap-5 p-2 ${isOwner ? 'flex-row-reverse' : ''}`}>
        <div className={`flex flex-col text-cyan-700 mb-5 ${isOwner ? '' : 'justify-start'}`}>
            <img className='w-12 h-12 rounded-full object-cover' src = "https://images.pexels.com/photos/9427363/pexels-photo-9427363.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"></img>
            <span className='text-sm font-normal'>just now</span>
        </div>
        <div className={`max-w-4/5 flex flex-col gap-2.5 ${isOwner ? 'items-end' : 'items-start'}`}>
            <p className={` p-2.5 rounded-xl max-w-max ${isOwner ? 'rounded-tr-none bg-gradient-to-l from-cyan-700/80 to-cyan-600/80   ' : 'rounded-tl-none bg-gradient-to-r from-slate-300 to-slate-200 '} shadow-md`}> hello there this a paragraph about something going on, this is our chat app</p>
            <img className='w-48 h-60 rounded-sm object-cover ' src = "https://images.pexels.com/photos/9427363/pexels-photo-9427363.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"></img>
        </div>
    </div>
  )
}
