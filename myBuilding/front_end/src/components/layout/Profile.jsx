import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import Modal from '../common/Modal'
import { Loading } from '../Loading'


export const Profile = () => {
const {currentUser,accountType} = useContext(AuthContext);

console.log(accountType)
//console.log(currentUser.photoURL)
  return (
<>

<div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
  <div className="flex items-center space-x-4">
    <img
      className="w-60 h-60 rounded-md object-cover"
      src={currentUser.photoURL}
      alt={`${currentUser.displayName}'s profile picture`}
    />
    <div>
      <h2 className="text-xl font-bold">{currentUser.displayName}</h2>
      <p className="text-gray-500">{accountType}</p>
      <p className="text-gray-500">{currentUser.email}</p>
    </div>
  </div>
  <div className="mt-4 md:mt-0">
    <Modal />
  </div>
</div>

  
</>


    


      
  )
}
