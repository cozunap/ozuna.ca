import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "ozuna-portfolio-admin",
  appId: "1:127887355356:web:10d817f14457f1127cb319",
  storageBucket: "ozuna-portfolio-admin.firebasestorage.app",
  apiKey: "AIzaSyBVFxuxS-XaHsqIAXGx4HvmqeGpj2rjumE",
  authDomain: "ozuna-portfolio-admin.firebaseapp.com",
  messagingSenderId: "127887355356"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
