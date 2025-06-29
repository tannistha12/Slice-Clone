// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhtQZdIsZLu_h7tZebk1ScVgTB6QLso2M",
  authDomain: "slice-clone.firebaseapp.com",
  projectId: "slice-clone",
  storageBucket: "slice-clone.firebasestorage.app",
  messagingSenderId: "1042495720195",
  appId: "1:1042495720195:web:a3ee2a298f87f6f4003736",
  measurementId: "G-E1TB5BFT62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);