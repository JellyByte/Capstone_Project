import React, { useState, useEffect } from 'react';
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject  } from "firebase/storage";
import { v4 } from "uuid";


export const Documents = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, "images/")
  const [selectedImage, setSelectedImage] = useState(null)
  const [deletedItem, setDeletedItem] = useState(null)
  
  const setDeletedObject = () => setDeletedItem(selectedImage)
  
  // Create a reference to the file to delete
  const desertRef = ref(storage, "images/" + deletedItem);

  // Delete the file
  deleteObject(desertRef).then(() => {
    window.location.reload(false)
  }).catch((error) => {
    console.log("Fail")
  })

  //Upload Images
  const uploadImage = () => {
    if (imageUpload == null) return
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    })
  }

  const selectableImageStyles = {
    userSelect: 'text'
  }

  //Stores images that are selected
  const handleImageSelect = (event) => {
    console.log('Image selected!');
    setSelectedImage(event.target.src.slice(83, 139));
  }

  //Displays all images in the database at the stat
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <div className = "App">
      <input type = "file" onChange={
        (event) => {
          setImageUpload(event.target.files[0])
        }}
      />
      <p></p>
      <button onClick={uploadImage}>Upload Image</button>
      {imageList.map((url) => {
        return <img src={url} style={selectableImageStyles} onMouseUp={handleImageSelect}/>
      })}
      <p></p>
      {selectedImage && <p>Selected Image: {selectedImage}</p>}
      <button onClick={setDeletedObject}>Delete Image</button>
    </div>
    
  )
}
