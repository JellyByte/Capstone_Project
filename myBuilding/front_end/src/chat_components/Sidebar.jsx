import React from 'react'
import { Chats } from './Chats'
import { Searchbar } from './Searchbar'

export const Sidebar = () => {
  return (
    <div className=' sticky top-0 bg-gray-400 ' >
 
          <Searchbar/>
          <Chats/>

        
    </div>
  )
}
