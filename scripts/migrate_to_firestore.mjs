import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyArqZN-CIto7baCaqW8EvP7IEf2VoTvsrU",
  authDomain: "ozuna-cv.firebaseapp.com",
  projectId: "ozuna-cv",
  storageBucket: "ozuna-cv.firebasestorage.app",
  messagingSenderId: "119121661780",
  appId: "1:119121661780:web:36565d7f2e6685311782c1",
  measurementId: "G-3R93XQ28P3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function migrateFolder(folderPath, collectionName) {
  if (!fs.existsSync(folderPath)) return;
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(content);
    const slug = file.replace(/\.md$/, '');
    
    const data = parsed.data;
    if (parsed.content && parsed.content.trim()) {
        data.body = parsed.content;
    }
    
    try {
      await setDoc(doc(db, collectionName, slug), data);
      console.log(`Migrated ${collectionName}/${slug}`);
    } catch (err) {
      console.error(`Error migrating ${slug}:`, err.message);
    }
  }
}

async function run() {
  try {
    console.log('Authenticating...');
    await signInWithEmailAndPassword(auth, 'cmozunap@gmail.com', 'c@2094Op###');
    console.log('Authentication successful!');
    
    console.log('Starting migration...');
    await migrateFolder('./src/content/pages', 'pages');
    await migrateFolder('./src/content/work', 'work');
    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error.message);
  }
  process.exit(0);
}

run();
