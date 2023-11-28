import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import db from '../database/firebase_connect.js';

export const renderHistory = async (req, res) => {
    const title = 'Historial';
    const q = query(collection(db, 'sensores'), orderBy('timestamp', 'desc'));
    const docsSnap = await getDocs(q);
    const registros = docsSnap.docs.map(doc => doc.data());
    if(docsSnap.empty)
        return res.render('history', { title })
    const datosGrafica = registros.slice(0, 5);
    res.render('history', { registros, title, datosGrafica })
};