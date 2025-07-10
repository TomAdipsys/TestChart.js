Lib Chart.js :  

DataBase : ClickHouse

Initialisation : 

Installer node : https://nodejs.org/fr

Installer Moments.js : https://momentjs.com/

Ajouter le Path node aux variables d'environnement système
Autoriser l'execution si la machine est sous windows

Créer et entrer dans le dossier du projet

npm init -y
npm install express cors body-parser @clickhouse-client

-  -  -  -  -  -  

dans index.js :
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ClickHouseClient } from '@clickhouse-client';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// Configurer la connexion à ClickHouse
const clickhouse = new ClickHouseClient({
  host: '51.91.178.210', 
  port: 8123,          
  user: 'default',          
  password: '',             
  database: 'hm_stats',     
});

-  -  -  -  -  -  

Dans index.html :

	Chart.js
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> 
	JQuery : Framework de JS permettant une affiliation plus rapide 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" ></script>
	jspdf : télécharger le résultat sous forme PDF ou IMG
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jsPDF/2.5.1/jspdf.umd.min.js"></script>



à tester
https://nagix.github.io/chartjs-plugin-colorschemes/


