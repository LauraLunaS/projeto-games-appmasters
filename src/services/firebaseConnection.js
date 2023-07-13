import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAF349GjLR2oRKMXHpme464fLW6mEpE-Ps",
  authDomain: "projeto-appmaster.firebaseapp.com",
  projectId: "projeto-appmaster",
  storageBucket: "projeto-appmaster.appspot.com",
  messagingSenderId: "969998358727",
  appId: "1:969998358727:web:abe841d8d8b860ed1286e2",
  measurementId: "G-C8E7S5KYB6"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };