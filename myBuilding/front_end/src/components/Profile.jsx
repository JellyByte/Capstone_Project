import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import MyComponent from "./svgs/addIcon.jsx"
import { useState } from 'react'
import Modal from './Modal'
import { Loading } from './Loading'

export const Profile = () => {
const {currentUser} = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(false);




console.log(currentUser.photoURL);
  return (
    <>
    
    {isLoading? <Loading/> : (

<div className='text-mono flex'>

<div className='p-2 '>

  <img className='w-80 h-60 rounded-md object-cover object-top ' src = {currentUser.photoURL}/>




  <Modal setIsLoading = {setIsLoading} isLoading = {isLoading}/>

  



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





    )}
    
    </>
    


      
  )
}
