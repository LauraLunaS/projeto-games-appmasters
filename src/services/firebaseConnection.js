import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDUcqszuKYPU2d9a6WGndoJfMUJhwiNgdA",
  authDomain: "projeto-app-masters.firebaseapp.com",
  projectId: "projeto-app-masters",
  storageBucket: "projeto-app-masters.appspot.com",
  messagingSenderId: "314158419275",
  appId: "1:314158419275:web:be3b87a5e6bfaef163acce",
  measurementId: "G-KKV9QPMNPR"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };