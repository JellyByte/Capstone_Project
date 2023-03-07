import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Profile = () => {
const {currentUser} = useContext(AuthContext);

console.log(currentUser.displayName);
  return (
    
    <div className='text-mono'>
      
      <img className='w-20 h-20 rounded-md object-cover' src = {currentUser.photoURL}/>
      
      hello {currentUser.displayName}
      
      
      


      
      
      
      
      
  
      
      
      </div>

      
  )
}
