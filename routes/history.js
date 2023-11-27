import express from 'express';
import { renderHistory } from '../controllers/historyController.js';
const router = express.Router();

router.get('/', renderHistory);

export default router;