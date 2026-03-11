import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "windpomp-liquors-web.firebaseapp.com",
    projectId: "windpomp-liquors-web",
    storageBucket: "windpomp-liquors-web.firebasestorage.app",
    messagingSenderId: "643369735833",
    appId: "1:643369735833:web:eea51b6da5e98354208a08"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
