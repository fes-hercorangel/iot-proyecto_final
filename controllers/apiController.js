import { collection, addDoc } from 'firebase/firestore';
import db from '../database/firebase_connect.js';
import { verificarFoco, verificarVentilador } from '../utils/verificador.js';
import moment from 'moment-timezone';

export const sendApi = async (req, res) => {
    const { sensor_prox, sensor_calor } = req.body
    const horaActual = moment().tz('America/Mexico_City').valueOf();
    const data = { sensor_prox, sensor_calor, timestamp: horaActual };
    await addDoc(collection(db, 'sensores'), data);

    const encenderFoco = await verificarFoco(sensor_prox);
    const encenderVentilador = await verificarVentilador(sensor_calor);

    res.send(`${encenderFoco},${encenderVentilador}`);
};