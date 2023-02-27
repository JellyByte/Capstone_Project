import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth";
import { SingleListing } from './SingleListing';
import { AuthContext } from '../context/AuthContext';

export const Listings = () => {

  //let navigate = useNavigate();
  //const[user] = useAuthState(auth)
  // useEffect(() => {
  //  user ? navigate('/listings'):navigate('/login')
  // }, [])

  const {currenUser} = useContext(AuthContext);
  console.log(currenUser);
  
  
  return (
    <div className="flex flex-col gap-2 p-2 ">

    <SingleListing/>
    <SingleListing/>
    <SingleListing/>

    <SingleListing/>
      <SingleListing/>
      <SingleListing/>

      <SingleListing/>


  </div>
  )
}
