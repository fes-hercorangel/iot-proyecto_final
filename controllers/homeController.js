import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import db from '../database/firebase_connect.js';

export const renderHome = async (req, res) => {
    const q = query(collection(db, 'sensores'), orderBy('timestamp'), limit(1));
    const docsSnap = await getDocs(q);
    const registro = docsSnap.docs.map(doc => doc.data())[0];
    if(docsSnap.empty)
        return res.render('home');
    res.render('home', { registro })
};