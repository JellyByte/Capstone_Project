import React from 'react'
import { Chats } from './Chats'
import { Navbar } from './Navbar'
import { Searchbar } from './Searchbar'

export const Sidebar = () => {
  return (
    <div className='w-2/5  bg-gray-400 ' >
        <Navbar/>
        <Searchbar/>
        <Chats/>
    </div>
  )
}
