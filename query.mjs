import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const configContent = fs.readFileSync('src/lib/firebase.ts', 'utf8');
const configMatch = configContent.match(/const firebaseConfig = ({[\s\S]*?});/);
if (configMatch) {
  const firebaseConfig = eval('(' + configMatch[1] + ')');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const pagesSnap = await getDocs(collection(db, 'pages'));
  console.log("PAGES:");
  pagesSnap.docs.forEach(d => console.log(d.id, d.data().title));
  
  process.exit(0);
}
