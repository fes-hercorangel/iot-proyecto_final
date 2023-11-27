import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE,
    messagingSenderId: process.env.MESSAGING_ID,
    appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
