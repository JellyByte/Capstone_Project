import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from "../../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth";
export const SingleListing = (props) => {
  //let navigate = useNavigate();
  //const[user] = useAuthState(auth)
  // useEffect(() => {

  //     if (user) {
  //         navigate('/singlelisting')
  //     }

  //     if (!user) {
  //         navigate('/login')
  //     }
  // }, [])
  console.log(props.descrip)
  return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={props.photoURL} alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2"> {props.title}</div>
          <p className="text-gray-700 text-base">
            Address: {props.descrip}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
    </div>
  )
}
