// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernproj1.firebaseapp.com",
  projectId: "mernproj1",
  storageBucket: "mernproj1.appspot.com",
  messagingSenderId: "653204578707",
  appId: "1:653204578707:web:56fefca17715d051580866"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);