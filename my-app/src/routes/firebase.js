import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmBtCk6Em80mF6iF3dNDwuzxFUHkbLwCo",
  authDomain: "omegaproxy-4abfe.firebaseapp.com",
  projectId: "omegaproxy-4abfe",
  storageBucket: "omegaproxy-4abfe.appspot.com",
  messagingSenderId: "126677191191",
  appId: "1:126677191191:web:e80e9787418312684eea52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
