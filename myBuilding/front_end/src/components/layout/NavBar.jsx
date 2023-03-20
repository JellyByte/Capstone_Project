import React from 'react'
import SignedLinks from './SignedLinks'
import SignedOutLinks from './SignedOutLinks'
import {  NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';








 const NavBar = () => {
  const { currentUser } = useContext(AuthContext);


  

    



    
  return (
    <header className='bg-slate-600 h-14 '>
        <div className=' grid grid-cols-2  '>

   


            <NavLink to="/" className='text-emerald-300 text-2xl font-medium justify-self-start p-2'> 
            
          
            myBuilding
            
            </NavLink>

            <nav className='justify-self-end p-2'>
                {
                  currentUser? <SignedLinks />
                  :<SignedOutLinks/>

                  
                }
            
              
           

            </nav>    

      
        
            
        </div>     
        
      
    </header>
    
  
        
        

  )

 
}
export default NavBar;
