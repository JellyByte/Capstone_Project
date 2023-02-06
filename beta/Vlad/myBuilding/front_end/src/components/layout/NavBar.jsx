import React, { useEffect } from 'react'
import SignedLinks from './SignedLinks'
import SignedOutLinks from './SignedOutLinks'
import { NavLink } from 'react-router-dom';

import {useAuthState} from 'react-firebase-hooks/auth'
import{auth} from "../../firebase-config"






 const NavBar = () => {
    const [user]= useAuthState(auth)




    
  return (
    <header className='bg-slate-600 py-4'>
        <div className='container mx-auto flex justify-between'>
            <NavLink to="/" className='text-emerald-300 text-2xl font-medium mr-4'> myBuilding</NavLink>
            <nav className='flex'>
            
               { user ? <SignedLinks />:<SignedOutLinks/>}
              
           

            </nav>    

      
        
            
        </div>     
        
      
    </header>
    
  
        
        

  )

 
}
export default NavBar;
