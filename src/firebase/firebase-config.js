import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import 'firebase/compat/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCMaJEff164Bc1HRfHl4bcBNlwOIJBFOmk",
  authDomain: "chat3-41f8b.firebaseapp.com",
  projectId: "chat3-41f8b",
  storageBucket: "chat3-41f8b.appspot.com",
  messagingSenderId: "1096645805607",
  appId: "1:1096645805607:web:54b12cffb63feb72a07002",
  measurementId: "G-XXGPH7D2QW"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const firestore = getFirestore(app)
  export const storage = getStorage(app)
 
  