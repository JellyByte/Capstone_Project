import React, { useState, useEffect, useContext } from 'react';
import { storage } from "../firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { AuthContext } from '../context/AuthContext';

export const Documents = () => {
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [url, setUrl] = useState('')

  

  const handleImageSelect = (event, url) => {
    setUrl(url) 
    const decodedUrl = decodeURIComponent(url); // Decode the URL encoding
    const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).replace(/\?.*/, ''); // Extract the filename from the decoded URL and remove the query string
    setSelectedImage(fileName);
  }

  const openDoc = () => {
    window.open(url)
  }

  const deleteImage = () => {
    if (selectedImage === null) return;
    
    if (window.confirm("Are you sure you want to delete" + selectedImage)) {
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
    }
    
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
    const imageRef = ref(storage, `documents/${currentUser.uid}/${v4() + imageUpload.name }`);
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

  const isImage = (url) => {
    const imageTypes = ['jpg','jpeg','png','gif','bmp']
    for (let i = 0; i < imageTypes.length; i++) {
      if (url.includes(imageTypes[i])) {
        return true
      }
    }
    return false
  };

  

  return (
    <div className="App">
      <input
        type="file"
        id="file-input"
        accept="image/*"
        style={{ display: 'none' }}
      />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        onClick={() => document.querySelector('#file-input').click()}>Add Document</button>
      <br />
      <br />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={deleteImage}>Delete</button>
      <br />
      <br />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openDoc}>Open Document</button>
      <br />
      <p>Document Selected:{selectedImage}</p>
      <br />
      

      <div className='flex flex-wrap ' >
        {imageList.map(url => {
          const imageName = url.split('/').pop();
          if (isImage(url)) {
            return (
              <div key={url}>
                <img
                  src={url}
                  className={`shadow-lg border-2 hover:shadow-2xl m-2 p-2 w-full rounded-md `}
                  style={{ width: '400px', height: '250px', userSelect: 'text' }}
                  onClick={event => handleImageSelect(event, url)}
                />
              </div>
            )
          }
          else {
            return (
              <div
                className={`shadow-lg border-2 hover:shadow-2xl m-2 p-2 w-full rounded-md text-xl font-bold text-center`}
                style={{ width: '400px', height: '250px', userSelect: 'text' }}
                onClick={event => handleImageSelect(event, url)}>
                <p>Document</p>
                <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                 
              </div>
            )
          }
          
        })}
      </div>
      
      
      
    </div>
  );
};
