import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "ozuna-cv",
  appId: "1:119121661780:web:36565d7f2e6685311782c1",
  storageBucket: "ozuna-cv.firebasestorage.app",
  apiKey: "AIzaSyArqZN-CIto7baCaqW8EvP7IEf2VoTvsrU",
  authDomain: "ozuna-cv.firebaseapp.com",
  messagingSenderId: "119121661780",
  measurementId: "G-3R93XQ28P3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
