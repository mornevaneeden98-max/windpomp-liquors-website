import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import fs from 'fs';

const firebaseConfig = {
    apiKey: "AIzaSyCZWzlMltmvM-pYLdCk1ir0KSAKwkKqZfU",
    authDomain: "windpomp-liquors-web.firebaseapp.com",
    projectId: "windpomp-liquors-web",
    storageBucket: "windpomp-liquors-web.firebasestorage.app",
    messagingSenderId: "643369735833",
    appId: "1:643369735833:web:eea51b6da5e98354208a08"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchContent() {
    const docRef = doc(db, "settings", "content");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        fs.writeFileSync('firestore_content.json', JSON.stringify(docSnap.data(), null, 2));
        console.log("Content fetched successfully!");
    } else {
        console.log("No such document!");
    }
}

fetchContent().catch(console.error);
