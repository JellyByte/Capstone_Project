import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import MyComponent from "./svgs/addIcon.jsx"
import { useState } from 'react'
import Modal from './Modal'

export const Profile = () => {
const {currentUser} = useContext(AuthContext);




console.log(currentUser.photoURL);
  return (
    
    <div className='text-mono flex'>

      <div className='p-2 '>

        <img className='w-80 h-60 rounded-md object-cover object-top ' src = {currentUser.photoURL}/>



     
        <Modal/>

        



      </div>
      <div className='p-2 flex flex-col'>
        <div>
          display name: {currentUser.displayName}

        </div>

        <div>
          email: {currentUser.email}

        </div>

      </div>
      
      
     

      
      
      


      
      
      
      
      
  
      
      
      </div>

      
  )
}
