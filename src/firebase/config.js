import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Updated with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCcLtC4uRkjZtq9G6_qTEY8WirJ81fQTJ8",
  authDomain: "alpha-digitronix-solutions.firebaseapp.com",
  projectId: "alpha-digitronix-solutions",
  storageBucket: "alpha-digitronix-solutions.firebasestorage.app",
  messagingSenderId: "325107824131",
  appId: "1:325107824131:web:007bfa43d87e5bdb3b8036",
  measurementId: "G-KX1W5LX9GK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
