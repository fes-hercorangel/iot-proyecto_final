import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../database/firebase_connect.js';

const obtenerConfiguracion = async () => {
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
    return configuration;
};

export const verificarFoco = async (sensor_prox) => {
    const configuration = await obtenerConfiguracion();
    const horaActual = new Date().toLocaleTimeString();
    if(configuration.foco_estado === 'on' && horaActual >= configuration.foco_hinicio && horaActual <= configuration.foco_hfin && sensor_prox === '1')
        return true;
    return false;
};

export const verificarVentilador = async (sensor_calor) => {
    const configuration = await obtenerConfiguracion();
    const temperatura = (sensor_calor / 1200.0) * 330.0;
    if(configuration.vent_estado === 'on' && temperatura >= configuration.vent_rango)
        return true;
    return false;
};