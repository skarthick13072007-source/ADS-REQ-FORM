import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBLcI_bsSqXgPBEWRzZm6tPNLci58Xfh6o",
  authDomain: "alpha-digitronix.firebaseapp.com",
  projectId: "alpha-digitronix",
  storageBucket: "alpha-digitronix.firebasestorage.app",
  messagingSenderId: "1021491376154",
  appId: "1:1021491376154:web:66e7569fc0536615a321a3",
  measurementId: "G-45Y8R62BHQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
