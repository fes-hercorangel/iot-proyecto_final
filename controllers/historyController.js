import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import db from '../database/firebase_connect.js';

export const renderHistory = async (req, res) => {
    const q = query(collection(db, 'sensores'), orderBy('timestamp'));
    const docsSnap = await getDocs(q);
    const registros = docsSnap.docs.map(doc => doc.data());
    if(docsSnap.empty)
        return res.render('history')
    res.render('history', { registros })
};