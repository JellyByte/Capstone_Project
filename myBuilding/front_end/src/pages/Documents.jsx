import React, { useState, useEffect } from 'react';
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


export const Documents = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, "images/")

  const [selectedImage, setSelectedImage] = React.useState(null);

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
  };

  const handleImageSelect = (event) => {
    console.log('Image selected!');
    const selectedImagePart = event.target.src.match(/[^\/]+$/)[0];
    setSelectedImage(selectedImagePart);
  };

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
    <button onClick={uploadImage}>Upload Image</button>
    {imageList.map((url) => {
      return <img src={url} style={selectableImageStyles} onMouseUp={handleImageSelect}/>
    })}

    {selectedImage && <p>Selected Image: {selectedImage}</p>}
    </div>
    
  )
}
