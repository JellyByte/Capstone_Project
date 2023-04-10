import React, { useState, useEffect, useContext } from 'react';
import { storage } from "../firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { AuthContext } from '../context/AuthContext';

export const Documents = () => {
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { currentUser } = useContext(AuthContext);

  let editMode = false

  

  const handleImageSelect = (event, url) => {
    if (editMode) {
      const decodedUrl = decodeURIComponent(url); // Decode the URL encoding
      const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).replace(/\?.*/, ''); // Extract the filename from the decoded URL and remove the query string
      setSelectedImage(fileName);
      console.log(fileName);
    }
    else {
      console.log("switch to edit mode")
    }
    
  }

  const deleteImage = () => {
    if (selectedImage === null) return;
  
    const imageRef = ref(storage, `documents/${currentUser.uid}/${selectedImage}`);
    deleteObject(imageRef)
      .then(() => {
        setSelectedImage(null);
        setImageList(prevList => prevList.filter(url => url.split('/').pop() !== selectedImage));
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setEditMode = () => {
    if(editMode) editMode = false
    else editMode = true
  }

  useEffect(() => {
    const imageListRef = ref(storage, `documents/${currentUser.uid}`);
    listAll(imageListRef)
      .then(response => {
        Promise.all(response.items.map(item => getDownloadURL(item)))
          .then(urls => {
            setImageList(urls);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentUser.uid]);

  const uploadImage = (event) => {
    const imageUpload = event.target.files[0];
    if (imageUpload == null) return;
    const imageRef = ref(storage, `documents/${currentUser.uid}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setImageList(prevList => [...prevList, url]);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const inputEl = document.querySelector('#file-input');
    inputEl.addEventListener('change', uploadImage);
    return () => {
      inputEl.removeEventListener('change', uploadImage);
    }
  }, [currentUser.uid]);

  

  return (
    <div className="App">
      <input
        type="file"
        id="file-input"
        accept="image/*"
        style={{ display: 'none' }}
      />
      <button onClick={() => document.querySelector('#file-input').click()}>Choose Image</button>
      <button onClick={setEditMode}>Edit</button>
      <button onClick={deleteImage}>Delete Image</button>
      <br />
      {selectedImage && <p>Selected Image: {selectedImage}</p>}
      <br />
      <div className='flex flex-wrap ' >
        {imageList.map(url => {
          const imageName = url.split('/').pop();
          return (
            <div key={url}>
              <img
                src={url}
                className={`shadow-lg border-2 hover:shadow-2xl m-2 p-2 w-full rounded-md  ${
                  selectedImage === imageName && 'border-green-500'
                }`}
                style={{ width: '400px', height: '250px', userSelect: 'text' }}
                onClick={event => handleImageSelect(event, url)}
              />
            </div>
          );
        })}
      </div>
      
      
      
    </div>
  );
};
