import React, { useContext } from 'react'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,db,storage} from "../../firebase-config"
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export const Register = () => {

  const [err,setErr] = useState(false);
  const {setAccountType,GenericPhotoUrl} = useContext(AuthContext);

    const navigate= useNavigate();
    
    const handleSubmit = async (e)=>{
      e.preventDefault();

      // Get values from the form
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const account_type = e.target[3].value;
      //set account type
      setAccountType(account_type);
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
        // Create user account with email and password
        
        
        try{
            if(account_type === "LandLord"){
              updateProfile(res.user, {
                displayName,
                account_type: account_type,
                photoURL: GenericPhotoUrl, // Pass GenericPhotoUrl as argument^
              });
              setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName:displayName,
                email:email,
                photoUrl: GenericPhotoUrl, // Pass GenericPhotoUrl as argument
                account_type:account_type,
                tenants:[],
              })}
              else{
                updateProfile(res.user, {
                  displayName,
                  account_type: account_type,
                  photoURL: GenericPhotoUrl, // Pass GenericPhotoUrl as argument

                });
                setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: GenericPhotoUrl, // Pass GenericPhotoUrl as argument
                  account_type:account_type,
                  land_lord_id:"",
                });
              }
            await setDoc(doc(db, "userChats", res.user.uid), {});
            
          }catch(err){
            console.log(err);
            setErr(true);
            
          }
          
          navigate("/profile");
          
      
    
      
        // Create an empty document for the user's chat data
     
      
        // Navigate to the user's profile page
     
        
    };//end of handle submit


  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-lg">
   
  
      <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
        <p className="flex justify-center text-lg font-medium">Register</p>

        <div>
          <label for="email" className="text-sm font-medium">User Name</label>
  
          <div className="relative mt-1">
            <input
              type="text"
              id="email"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Your Name"
            />
  
        
          </div>
        </div>
  
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
  
          <div className="relative mt-1">
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
  
            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <div>
          <label htmlFor="password" className="text-sm font-medium">Password</label>
  
          <div className="relative mt-1">
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
  
            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">Account Type</label>
  
          <div className="relative mt-1">
            {/* <input
              type="password"
              id="password"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
            /> */}
           
       
          <select  >
            <option value="Tenant">Tenant</option>
            <option value="LandLord">LandLord</option>
          
          </select>
       
           
  
          
          </div>
        </div>
        

        {/* <input required className='hidden'  type="file" id="file" />
            <label className='flex place-items-center gap-2 py-4' htmlFor='file'>
                <img className='h-8 w-8 object-cover' src={add} alt="" />
               
                <span >Choose profile photo</span>
            </label>
         */}


  
        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Register
        </button>
        {err && <span>something went wrong</span>}
  
        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/Login" className="underline text-blue-500 text-lg hover:text-red-500">Login</Link>
          </p>
      </form>
    </div>
  </div>

  )
}
