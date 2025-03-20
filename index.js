import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import dataRoutes from './routes/dataRoutes.js';
import listEndpoints from 'express-list-endpoints';
import { createClient } from "@clickhouse/client";

export const liaisonDB = createClient({
    url: process.env.CLICKHOUSE_URL, //|| 'http://51.91.178.210:8123',
    username: process.env.CLICKHOUSE_USER, //|| 'clickhouse',
    password: process.env.CLICKHOUSE_PASSWORD, //|| 'clickhouse',
    database: process.env.CLICKHOUSE_DB //||'hm_stats'
})


const app = express();
const port = process.env.PORT; //|| 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Utiliser les routes définies dans dataRoutes
app.use('/hm_stats', dataRoutes);

app.listen(port, async () => {
  console.log(`Serveur Express en écoute sur le port ${port}`);

});
console.log(listEndpoints(app));
