import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth";
export const SingleListing = () => {
  let navigate = useNavigate();
  const[user] = useAuthState(auth)
  useEffect(() => {

      if (user) {
          navigate('/singlelisting')
      }

      if (!user) {
          navigate('/login')
      }
  }, [])
  return (
    <div>SinglePost</div>
  )
}
