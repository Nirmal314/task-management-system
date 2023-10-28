// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAHvT76VQquH3KUowA_7Kv94nrkkjUyNlk",
  authDomain: "task-management-20cce.firebaseapp.com",
  projectId: "task-management-20cce",
  storageBucket: "task-management-20cce.appspot.com",
  messagingSenderId: "286711449581",
  appId: "1:286711449581:web:cb47fecfe5adeb1f8049e4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);