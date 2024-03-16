//firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhrmN_uUfM2vmztMsvGwqWM1QLdd79jyg",
  authDomain: "safal-aa05c.firebaseapp.com",
  projectId: "safal-aa05c",
  storageBucket: "safal-aa05c.appspot.com",
  messagingSenderId: "749630971079",
  appId: "1:749630971079:web:794f173967a93b515872e2",
  databaseURL : "https://safal-aa05c-default-rtdb.firebaseio.com", }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };