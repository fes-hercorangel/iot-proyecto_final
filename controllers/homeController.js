import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import db from '../database/firebase_connect.js';
import { verificarFoco, verificarVentilador } from '../utils/verificador.js';

export const renderHome = async (req, res) => {
    const title = 'Estado Actual';
    const q = query(collection(db, 'sensores'), orderBy('timestamp', 'desc'), limit(1));
    const docsSnap = await getDocs(q);
    const registro = docsSnap.docs.map(doc => doc.data())[0];
    if(docsSnap.empty)
        return res.render('home', { title, encenderFoco: false, encenderVentilador: false });
    const encenderFoco = await verificarFoco(registro.sensor_prox);
    const encenderVentilador = await verificarVentilador(registro.sensor_calor);
    res.render('home', { registro, title, encenderFoco, encenderVentilador })
};