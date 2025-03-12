import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dataRoutes from './routes/dataRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Utiliser les routes définies dans dataRoutes
app.use('/hm_stats', dataRoutes);

app.listen(port, () => {
  console.log(`Serveur Express en écoute sur le port ${port}`);
});
