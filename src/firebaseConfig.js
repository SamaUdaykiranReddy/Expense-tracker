import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7Q7va2B9FU04AsuHz3X5bn-7Xakm-Xts",
  authDomain: "expense-tracker-49c36.firebaseapp.com",
  projectId: "expense-tracker-49c36",
  storageBucket: "expense-tracker-49c36.firebasestorage.app",
  messagingSenderId: "771360104153",
  appId: "1:771360104153:web:4f3cfc1190992ea9a928c8",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);