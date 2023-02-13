import React, { useState, useEffect, useRef } from 'react';
import * as firebase from "../firebase";
import "firebase/storage";
import { v4 } from "uuid";

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

  const uploadToFirebase = () => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${new Date().getTime()}.jpeg`);
    const uploadTask = imageRef.putString(capturedImage, 'data_url');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('Uploaded a blob or file!');
      });
  };

  return (
    <div>
      <button onClick={toggleWebcam}>
        {isWebcamEnabled ? 'Stop Webcam' : 'Start Webcam'}
      </button>
      {isWebcamEnabled && (
        <div>
          <video id="webcam" ref={webcamRef} autoPlay playsInline width={640} height={480} />
          <button onClick={takePicture}>Take Picture</button>
        </div>
      )}
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
          <button onClick={uploadToFirebase}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default Upload;
