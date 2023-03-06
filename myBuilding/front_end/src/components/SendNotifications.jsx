import React, { useRef } from 'react'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,db,storage} from "../firebase-config"
import { useState } from "react";
import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore"; 


export const SendNotifications = () => {
  let time = Timestamp.now()
  const notifyType = useRef(null)
  let txt
  let id
  let userList = []

  const setTxt = (event) => txt = event.target.value
  const setUser = (event) => id = event.target.value

  const getUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach((doc) => {
      
      const user = {
        value: doc.data().displayName,
        label: doc.data().displayName
      }
      userList.push(user)
    })
  }

  const addNotification = async () => {
    const selectedNotifyType = notifyType.current.value
    
    try{
      const newDoc = doc(collection(db, "notifications"))
      if (id === undefined || selectedNotifyType === "public") id = "none"
      await setDoc(newDoc, {
        date: time,
        notificationType: selectedNotifyType,
        text: txt, 
        userId: id
        
      })
    }
    catch(err){
      console.log("Notification Failed")
      console.log(time)
      console.log(notifyType)
      console.log(txt)
      console.log(id)
    }
  }

  const noteTyping = () => {
    if (notifyType === "public") document.getElementById("getUser").ariaReadOnly = true
    else document.getElementById("getUser").ariaReadOnly = false
  }
  
  

  return (
    <div>
      <h1>Send Notifications</h1> 
      <input type="text" name="text" id="text" placeholder='notification text here' onChange={setTxt}/>
      <br /><br />

      Public Notification
      <select name="notificationType" ref={notifyType} onChange={noteTyping}>
        <option value="public">True</option>
        <option value="private">False</option>
      </select>
      <br />

      User: 
      <input id="getUser" type="text" placeholder='type user here' onChange={setUser}/>
      <br /> <br />
      <button onClick={addNotification}>Publish</button>
      <br />
      <button onClick={getUser}> List Users</button>


    </div>
  )
}
