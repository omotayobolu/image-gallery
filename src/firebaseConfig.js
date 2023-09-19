// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT8T-dvTR3hidJ8gGciIBLIGfMh8hQlYM",
  authDomain: "image-gallery-33385.firebaseapp.com",
  projectId: "image-gallery-33385",
  storageBucket: "image-gallery-33385.appspot.com",
  messagingSenderId: "58209787086",
  appId: "1:58209787086:web:2a7b7d6f8aafa0bbb3049f",
  measurementId: "G-6ELCNJ64B5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
