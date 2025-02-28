import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // 🔥 Firestore importato

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-passport-bea7d.firebaseapp.com",
  projectId: "pet-passport-bea7d",
  storageBucket: "pet-passport-bea7d.firebasestorage.app",
  messagingSenderId: "892955425587",
  appId: "1:892955425587:web:2e37642e750d56c2309c46",
  measurementId: "G-9GTR83SNKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // 🔥 Esporta il database Firestore

