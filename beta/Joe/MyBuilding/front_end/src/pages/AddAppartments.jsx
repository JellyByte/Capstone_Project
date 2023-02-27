import {
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    orderBy,
    limit,
  } from 'firebase/firestore';
import { db } from "../firebase"
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from './auth/Auth';
import React, { useState } from 'react';




export const AddAppartments = () => {
    const [aptName, setAptName] = useState('')
    const [address, setAddress] = useState('')
    const [desc, setDesc] = useState ('')

    async function addApartment() {
        const newApartment = {
            aptName,
            address,
            desc,
            id: uuidv4(),
        }

        try {
            const collectionRef = collection(db, "appartments")
            const aptRef = doc(collectionRef, newApartment.id)
            await setDoc(collectionRef, aptRef)
        }
        catch (error) {
            console.log("error adding data ")
        }
    }
    

    
    
    
    
  return (
    <div>
        <input type="text" value={aptName} onChange={(e) => setAptName()} placeholder="apartment name" />
        <input type="text" value={address} onChange={(e) => setAddress()} placeholder="apartment name" />
        <input type="text" value={desc} onChange={(e) => setDesc()} placeholder="apartment name" />

      <button onClick={addApartment()}>Add Data</button>
    </div>
  );
}