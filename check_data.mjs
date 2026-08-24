import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const configContent = fs.readFileSync('src/lib/firebase.ts', 'utf8');
const configMatch = configContent.match(/const firebaseConfig = ({[\s\S]*?});/);
if (configMatch) {
  const firebaseConfig = eval('(' + configMatch[1] + ')');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const docSnap = await getDoc(doc(db, 'pages', 'about'));
  console.log("ABOUT DATA:");
  console.log(JSON.stringify(docSnap.data(), null, 2));
  
  process.exit(0);
}
