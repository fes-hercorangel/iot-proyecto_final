import express from 'express';
import { renderAbout } from '../controllers/aboutController.js';
const router = express.Router();

router.get('/', renderAbout);

export default router;