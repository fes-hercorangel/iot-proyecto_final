import express from 'express';
import { sendApi } from '../controllers/apiController.js';
const router = express.Router();

router.post('/send', sendApi);

export default router;