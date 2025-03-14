import { ClickHouseClient } from '@depyronick/clickhouse-client';

// Configurer la connexion à ClickHouse
const clickhouse = new ClickHouseClient({
  host: '51.91.178.210', 
  port: 8123,
  user: 'default',
  password: '',
  database: 'hm_stats',
});

// Fonction pour récupérer le nombre de connexions
export async function getNbConnection() {
  return await clickhouse.queryPromise(`
    SELECT DISTINCT(accesspointmac), count(*) AS nb
    FROM hm_stats.sessions    
    GROUP BY accesspointmac 
    LIMIT 10
  `);
}

// Fonction pour récupérer les dates de connexion
export async function getConnectionTimes() {
  return await clickhouse.queryPromise(`
    SELECT DISTINCT(accesspointmac), acctstarttime AS time 
    FROM hm_stats.sessions 
    LIMIT 10
  `);
}