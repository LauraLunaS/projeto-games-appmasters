import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAyHZC8Jj5b1KALCf-HldC6V30Cm2L-PcM",
  authDomain: "games-43599.firebaseapp.com",
  projectId: "games-43599",
  storageBucket: "games-43599.appspot.com",
  messagingSenderId: "1065213397836",
  appId: "1:1065213397836:web:9b8383648a56282c4e9de9",
  measurementId: "G-6MN6R68XTH"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };