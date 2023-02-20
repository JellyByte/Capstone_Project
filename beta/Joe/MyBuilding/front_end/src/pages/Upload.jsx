import React, { useState, useEffect, useRef } from 'react';
import {storage} from "../firebase";
import { ref } from "firebase/storage";
import { v4 } from "uuid";
import { uploadBytes } from 'firebase/storage';

export const Upload = () => {
  const [stream, setStream] = useState(null);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(true);
  const webcamRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (!stream && isWebcamEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(setStream)
        .catch(console.error);
    } else {
      webcamRef.current.srcObject = stream;
    }
  }, [stream, isWebcamEnabled]);

  const toggleWebcam = () => {
    setIsWebcamEnabled(!isWebcamEnabled);
    if (!isWebcamEnabled) {
      setStream(null);
      webcamRef.current.srcObject = null;
    }
  };

  const takePicture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = webcamRef.current.videoWidth;
    canvas.height = webcamRef.current.videoHeight;
    canvas.getContext('2d').drawImage(webcamRef.current, 0, 0);
    setCapturedImage(canvas.toDataURL('image/jpeg'));
  };

  const upload = () => {
    const base64 = capturedImage.split(',')[1];
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
  
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
  
    const imageRef = ref(storage, `images/${v4()}`)
    uploadBytes(imageRef, array.buffer)
  }

  return (
    <div>
                      {/* <button onClick={toggleWebcam}>
        {isWebcamEnabled ? 'Stop Webcam' : 'Start Webcam'}
      </button>      */}
      {isWebcamEnabled && (
        <div>
          <video id="webcam" ref={webcamRef} autoPlay playsInline width={640} height={480} />
          <button onClick={takePicture}>Take Picture</button>
        </div>
      )}
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
          <button onClick={upload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default Upload;
