import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyD9ffNjvYvGk8EKXLsFNI7jaeFDKp1inV8",
    authDomain: "farm-9f759.firebaseapp.com",
    projectId: "farm-9f759",
    storageBucket: "farm-9f759.appspot.com",
    messagingSenderId: "113611308731",
    appId: "1:113611308731:web:9283868fd231c6f114339e",
    measurementId: "G-5B149BS8LP"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const firestore = getFirestore(app)
  export const storage = getStorage(app)
 
  