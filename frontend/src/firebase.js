// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dashboard-43b16.firebaseapp.com",
  projectId: "mern-blog-dashboard-43b16",
  storageBucket: "mern-blog-dashboard-43b16.appspot.com",
  messagingSenderId: "352397637863",
  appId: "1:352397637863:web:01dce2f4a3ea0c24bf0a42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

