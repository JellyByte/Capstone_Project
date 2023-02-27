import React from 'react'
import { Chats } from './Chats'
import { Navbar } from './Navbar'
import { Searchbar } from './Searchbar'

export const Sidebar = () => {
  return (
    <div className='w-1/5  bg-gray-400 ' >
        {/* <Navbar/> */}
        <div className='sticky top-0'>
          <Searchbar/>
          <Chats/>

        </div>
    </div>
  )
}
