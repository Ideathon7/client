// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth/cordova";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-KzUpkLe7XaJSPmPfPLLa38ihHMzPvYM",
  authDomain: "book-rental-d33e2.firebaseapp.com",
  projectId: "book-rental-d33e2",
  storageBucket: "book-rental-d33e2.appspot.com",
  messagingSenderId: "110645772182",
  appId: "1:110645772182:web:2e704705de0db57cd3a7b7",
  measurementId: "G-K5QRJV69B6",
  databaseURL: "https://book-rental-d33e2-default-rtdb.firebaseio.com", // Add this line
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
