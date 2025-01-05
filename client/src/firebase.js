// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-f1833.firebaseapp.com",
  projectId: "mern-auth-f1833",
  storageBucket: "mern-auth-f1833.firebasestorage.app",
  messagingSenderId: "138005991801",
  appId: "1:138005991801:web:7472c9859494f88351dfa8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
