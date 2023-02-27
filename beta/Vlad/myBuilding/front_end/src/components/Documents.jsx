import React, { useState, useEffect, useContext } from 'react';
import { storage } from "../firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { AuthContext } from '../context/AuthContext';

export const Documents = () => {
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleImageSelect = (event, url) => {
    const decodedUrl = decodeURIComponent(url); // Decode the URL encoding
    const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).replace(/\?.*/, ''); // Extract the filename from the decoded URL and remove the query string
    setSelectedImage(fileName);
    console.log(fileName);
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
      {imageList.map(url => {
        const imageName = url.split('/').pop();
        return (
          <div key={url}>
            <img
              src={url}
              className={`border-2 border-gray-500 hover:border-red-500 m-2 p-2 ${
                selectedImage === imageName && 'border-green-500'
              }`}
              style={{ width: '150px', height: '100px', userSelect: 'text' }}
              onClick={event => handleImageSelect(event, url)}
            />
          </div>
        );
      })}
      {selectedImage && <p>Selected Image: {selectedImage}</p>}
      <button onClick={deleteImage}>Delete Image</button>
    </div>
  );
};
