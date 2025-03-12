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
  return clickhouse.queryPromise(`
    SELECT DISTINCT(accesspointmac), count(*) AS nb 
    FROM hm_stats.sessions    
    GROUP BY accesspointmac 
    LIMIT 25
  `);
}

// Fonction pour récupérer les dates de connexion
export async function getConnectionTimes() {
  return clickhouse.queryPromise(`
    SELECT DISTINCT(accesspointmac), acctstarttime AS time 
    FROM hm_stats.sessions 
    LIMIT 25
  `);
}

// Total données envoyées
export async function getOutPutOctets() {
  return clickhouse.queryPromise(`
    SELECT SUM(acctoutputoctets) AS total_data_sent
    FROM hm_stats.sessions;
  `);
}

export async function getOutPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, SUM(acctoutputoctets) AS total_data_sent
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Moyenne données envoyées
export async function getAvgOutPutOctets() {
  return clickhouse.queryPromise(`
    SELECT AVG(acctoutputoctets) AS average_data_sent
    FROM hm_stats.sessions;
  `);
}

export async function getAvgOutPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, AVG(acctoutputoctets) AS average_data_sent
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Min données envoyées
export async function getMinOutPutOctets() {
  return clickhouse.queryPromise(`
    SELECT MIN(acctoutputoctets) AS min_data_sent
    FROM hm_stats.sessions;
  `);
}

export async function getMinOutPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, MIN(acctoutputoctets) AS min_data_sent
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Max données envoyées
export async function getMaxOutPutOctets() {
  return clickhouse.queryPromise(`
    SELECT MAX(acctoutputoctets) AS max_data_sent
    FROM hm_stats.sessions;
  `);
}

export async function getMaxOutPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, MAX(acctoutputoctets) AS max_data_sent
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Total données reçues
export async function getTotalInPutOctets() {
  return clickhouse.queryPromise(`
    SELECT SUM(acctinputoctets) AS total_data_received
    FROM hm_stats.sessions;
  `);
}

export async function getTotalInPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, SUM(acctinputoctets) AS total_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Moyenne données reçues
export async function getAvgInPutOctets() {
  return clickhouse.queryPromise(`
    SELECT AVG(acctinputoctets) AS average_data_received
    FROM hm_stats.sessions;
  `);
}

export async function getAvgInPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, AVG(acctinputoctets) AS average_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Min données reçues
export async function getMinInPutOctets() {
  return clickhouse.queryPromise(`
    SELECT MIN(acctinputoctets) AS min_data_received
    FROM hm_stats.sessions;
  `);
}

export async function getMinInPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, MIN(acctinputoctets) AS min_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Max données reçues
export async function getMaxInPutOctets() {
  return clickhouse.queryPromise(`
    SELECT MAX(acctinputoctets) AS max_data_received
    FROM hm_stats.sessions;
  `);
}

export async function getMaxInPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, MAX(acctinputoctets) AS max_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Total données (envoyées + reçues)
export async function getTotalInOutOctets() {
  return clickhouse.queryPromise(`
    SELECT SUM(acctoutputoctets + acctinputoctets) AS total_data
    FROM hm_stats.sessions;
  `);
}

export async function getTotalInOutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, SUM(acctoutputoctets + acctinputoctets) AS total_data
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Moyenne données (envoyées + reçues)
export async function getAvgInOutOctets() {
  return clickhouse.queryPromise(`
    SELECT AVG(acctoutputoctets + acctinputoctets) AS average_data
    FROM hm_stats.sessions;
  `);
}

export async function getAvgInOutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, AVG(acctoutputoctets + acctinputoctets) AS average_data
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Min données (envoyées + reçues)
export async function getMinInOutOctets() {
  return clickhouse.queryPromise(`
    SELECT MIN(acctoutputoctets + acctinputoctets) AS min_data
    FROM hm_stats.sessions;
  `);
}

export async function getMinInOutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, MIN(acctoutputoctets + acctinputoctets) AS min_data
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}

// Max données (envoyées + reçues)
export async function getMaxInOutOctets() {
  return clickhouse.queryPromise(`
    SELECT MAX(acctoutputoctets + acctinputoctets) AS max_data
    FROM hm_stats.sessions;
  `);
}

export async function getMaxInOutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, MAX(acctoutputoctets + acctinputoctets) AS max_data
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10;
  `);
}
