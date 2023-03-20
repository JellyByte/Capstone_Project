import { useState, useEffect } from 'react'
import React from 'react'
import { db } from '../../firebase-config'

const Grid = (collection) => {
    const[docs, setDocs] = useState([])

    useEffect(() => {
        const unsub = db.collection(collection)
        .onSnapshot((snap) => {

            let listings = []
            snap.forEach(doc  => {
                listings.push({...doc.data(), id: doc.id})
            });
            setDocs(listings)} )

            return() => unsub()
        
        
        }, [collection])

    return{
        docs
    }
}

export default Grid