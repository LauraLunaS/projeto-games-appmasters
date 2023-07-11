import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD74ry8eJXsfwq5gU60uk7N3YhJtVgwywU",
  authDomain: "projeto-games-ce732.firebaseapp.com",
  projectId: "projeto-games-ce732",
  storageBucket: "projeto-games-ce732.appspot.com",
  messagingSenderId: "258120998456",
  appId: "1:258120998456:web:626545aa9d3f64b26850cd",
  measurementId: "G-GGCCDJGG3N"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };