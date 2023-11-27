import { doc, collection, addDoc, getDoc, setDoc } from 'firebase/firestore';
import db from '../database/firebase_connect.js';

export const sendApi = async (req, res) => {
    const { sensor_prox, sensor_calor } = req.body
    const docRef = doc(db, 'configuracion', '1');
    const q = await getDoc(docRef);
    let configuration = {
        foco_hinicio: '20:00',
        foco_hfin: '23:59',
        foco_estado: 'off',
        vent_estado: 'off',
        vent_rango: '0'
    };
    if(q.exists())
        configuration = q.data();
    else
        await setDoc(docRef, configuration);
    const data = { sensor_prox, sensor_calor, timestamp: Date.now() };
    await addDoc(collection(db, 'sensores'), data);

    const temperatura = (sensor_calor / 1200.0) * 330.0;
    const horaActual = new Date().toLocaleTimeString();
    let val1 = false;
    let val2 = false;

    if(configuration.foco_estado === 'on' && horaActual >= configuration.foco_hinicio && horaActual <= configuration.foco_hfin && sensor_prox === '1')
        val1 = true;
    if(configuration.vent_estado === 'on' && temperatura >= configuration.vent_rango)
        val2 = true
    res.send(`${val1},${val2}`);
};