import express from 'express';
import { getData } from '../controllers/dataController.js';


const router = express.Router();

// Définir la route pour récupérer les données
router.get('/', getData);

export default router;
