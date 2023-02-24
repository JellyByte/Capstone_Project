import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {SingleListing} from "./SingleListing";
import {auth} from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth";

export const Listings = () => {

  let navigate = useNavigate();
  //const[user] = useAuthState(auth)
  // useEffect(() => {
  //  user ? navigate('/listings'):navigate('/login')
  // }, [])
  
  
  return (
      <div className="flex flex-row flex-col gap-2 p-2 ">

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
