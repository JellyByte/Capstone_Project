import React from 'react'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,db,storage} from "../firebase-config"
import { useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore"; 

export const SendNotifications = () => {
  let time = Timestamp.now()
  let notifyType
  let txt = document.getElementById("text").target.value
  let id = "none"

  const setNotifyType = (event) => notifyType = event.target.value

  const addNotification = async () => {
    try{
      await setDoc(doc(db,"notifications","notification-id" ), {
        date: time,
        notificationType: notifyType,
        text: txt, 
        userId: id
        
      })
    }
    catch(err){
      console.log("Notification Failed")
    }
  }
  
  

  return (
    <div>
      <h1>Send Notifications</h1> 
      <input type="text" name="text" id="text" placeholder='notification text here'/>
      <br /><br />

      Public Notification
      <select name="notificationType" onChange={setNotifyType}>
        <option value="public">True</option>
        <option value="private">False</option>
      </select>
      <br />

      User: 
      <input type="text" placeholder='type user here' value={input}/>
      <br /> <br />
      <button onClick={addNotification}>Publish</button>

    </div>
  )
}
