// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaZ2ZbmJKNrHyV4tvJ7g4F1ty0C_90azA",
  authDomain: "pcweb-7.firebaseapp.com",
  projectId: "pcweb-7",
  storageBucket: "pcweb-7.appspot.com",
  messagingSenderId: "223902970486",
  appId: "1:223902970486:web:f99f0d8246bb256c33a557",
  measurementId: "G-E0J9TYVH2N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app)