import express from 'express';
import { renderForm, sendForm } from '../controllers/formController.js';
const router = express.Router();

router.get('/', renderForm);

router.post('/', sendForm);

export default router;