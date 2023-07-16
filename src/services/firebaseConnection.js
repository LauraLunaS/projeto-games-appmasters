import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDn0YWmczmsxihZLXIXeRWRJja8ThPXjI4",
  authDomain: "games-project-7d334.firebaseapp.com",
  projectId: "games-project-7d334",
  storageBucket: "games-project-7d334.appspot.com",
  messagingSenderId: "455873876513",
  appId: "1:455873876513:web:787d1839345a5a617c8960",
  measurementId: "G-GJ40V4XX14"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };