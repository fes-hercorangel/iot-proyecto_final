import { getDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import db from '../database/firebase_connect.js';

export const renderForm = async (req, res) => {
    const q = await getDoc(doc(db, 'configuracion', '1'));
    if(q.exists()) {
        const configuration = q.data();
        return res.render('form', { configuration });
    }
    res.render('form')
};

export const sendForm = async (req, res) => {
    const { foco_estado, foco_hinicio, foco_hfin, vent_estado, vent_rango } = req.body;
    const configuration = { 
        foco_estado: foco_estado ? 'on' : 'off',
        foco_hinicio,
        foco_hfin,
        vent_estado: vent_estado ? 'on' : 'off',
        vent_rango
    };
    const errors = {};
    if(foco_hinicio === '')
        errors['hinicio'] = 'Selecciona la hora de inicio';
    if(foco_hfin === '')
        errors['hfin'] = 'Selecciona la hora de finalizacion';
    if(foco_hinicio >= foco_hfin && foco_hinicio !== '' && foco_hfin !== '')
        errors['hincorrecta'] = 'La hora de inicio debe ser menor a la hora de finalizacion';

    if(Object.keys(errors).length !== 0)
        return res.render('form', { configuration, errors });

    const docRef = doc(db, 'configuracion', '1');
    const docSnap = await getDoc(docRef);
    if(docSnap.exists())
        await updateDoc(docRef, configuration);
    else
        await setDoc(docRef, configuration);

    res.redirect('form');
};