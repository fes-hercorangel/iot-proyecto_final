import express from 'express';
import 'dotenv/config.js'
import formRoutes from './routes/form.js';
import apiRoutes from './routes/api.js';
import homeRoutes from './routes/home.js';
import historyRoutes from './routes/history.js';
import { Server } from 'socket.io';
import http from 'http';
import db from './database/firebase_connect.js'
import { collection, onSnapshot } from 'firebase/firestore';

const port = process.env.PORT || 5500;

const app = express();
const server = http.createServer(app);
const socket = new Server(server.listen(port));
console.log(`servidor iniciado http://localhost:${port}`);

const unsub = onSnapshot(collection(db, 'sensores'), snapshot => {
    snapshot.docChanges().forEach(change => {
        const data = change.doc.data();
        if(change.type === 'added')
            socket.emit('db:newData', data);
    });
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use('/', homeRoutes);
app.use('/history', historyRoutes);
app.use('/form', formRoutes);
app.use('/api', apiRoutes);