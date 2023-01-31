// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmS8hTOOqd2VpEoET7UA5bAmO6N-fbsO8",
  authDomain: "superchat-6dc3d.firebaseapp.com",
  projectId: "superchat-6dc3d",
  storageBucket: "superchat-6dc3d.appspot.com",
  messagingSenderId: "1025796310688",
  appId: "1:1025796310688:web:51a681bdca52646e06ebc5",
  measurementId: "G-M8XCPWF98Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)