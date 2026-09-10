import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "ozuna-portfolio",
  appId: "1:650035639712:web:100ac93a8b01cdc07de0c5",
  storageBucket: "ozuna-portfolio.firebasestorage.app",
  apiKey: "AIzaSyDpFSQnvbjv6_OC1YcmqovydmSJowvFEFY",
  authDomain: "ozuna-portfolio.firebaseapp.com",
  messagingSenderId: "650035639712"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
