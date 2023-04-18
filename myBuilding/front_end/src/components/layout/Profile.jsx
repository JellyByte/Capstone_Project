import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import Modal from '../common/Modal'
import AddTenantModal from '../common/AddTenantModal'
import { Loading } from '../Loading'
import UploadForm from '../common/UploadForm'
import { AddListingsModal } from '../LandLord/AddListingsModal'
import { SendNotificationsModal } from '../LandLord/SendNotificationsModal'

export const Profile = () => {
const {currentUser,accountType,GenericPhotoUrl,setLoading} = useContext(AuthContext);
//setLoading(true);
console.log(accountType);


//console.log(currentUser.photoURL)
  return (
<>

<div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
  <div className="flex items-center space-x-2 md:space-x-4">
    <img
      className="w-40 md:w-60 h-40 md:h-60 rounded-md object-cover"
      src={currentUser.photoURL}
      alt={`${currentUser.displayName}'s profile picture`}
    />
    <div>
      <h2 className="text-lg md:text-xl font-bold">{currentUser.displayName}</h2>
      <p className="text-gray-500 text-sm md:text-base">{accountType}</p>
      <p className="text-gray-500 text-sm md:text-base">{currentUser.email}</p>
    </div>
  </div>
  <div className="flex flex-col items-center md:flex-row md:items-start gap-2 md:gap-4 mt-2 md:mt-0">
    <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-4 p-1">
    {accountType === "LandLord" && <AddTenantModal />}
    {accountType === "LandLord" && <AddListingsModal />}
    {accountType === "LandLord" && <SendNotificationsModal />}
    </div>
    <div className="p-1">
      <Modal />
    </div>
  </div>
</div>








  
</>


    


      
  )
}
