import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDgrwcvzVO_IQECxsCP2d0J_sIX3F_2DmY",
  authDomain: "projeto-games-app.firebaseapp.com",
  projectId: "projeto-games-app",
  storageBucket: "projeto-games-app.appspot.com",
  messagingSenderId: "668688188579",
  appId: "1:668688188579:web:7ea92e33bde2ae26a22b16",
  measurementId: "G-RE5CVFC98Y"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };