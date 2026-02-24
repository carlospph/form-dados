// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE3U-N-Z6boWQRopheZGDLmRMaqoT7hcM",
  authDomain: "casadascorez.firebaseapp.com",
  projectId: "casadascorez",
  storageBucket: "casadascorez.firebasestorage.app",
  messagingSenderId: "322771685180",
  appId: "1:322771685180:web:7471651d6fb9019c501839",
  measurementId: "G-78101DE4BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
