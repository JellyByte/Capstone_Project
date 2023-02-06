import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBHL5tFxKMnvhHijm0Z4i2EHQsvJm7hh-U",
    authDomain: "chatapp-94657.firebaseapp.com",
    projectId: "chatapp-94657",
    storageBucket: "chatapp-94657.appspot.com",
    messagingSenderId: "342074122603",
    appId: "1:342074122603:web:0266e2656d5782d5b7ec2e",
    measurementId: "G-1R3LE1TMWR"
  }).auth();
