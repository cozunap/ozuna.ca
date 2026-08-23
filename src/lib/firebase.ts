import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArqZN-CIto7baCaqW8EvP7IEf2VoTvsrU",
  authDomain: "ozuna-cv.firebaseapp.com",
  projectId: "ozuna-cv",
  storageBucket: "ozuna-cv.firebasestorage.app",
  messagingSenderId: "119121661780",
  appId: "1:119121661780:web:36565d7f2e6685311782c1",
  measurementId: "G-3R93XQ28P3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
