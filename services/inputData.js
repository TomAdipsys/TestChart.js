import { ClickHouseClient } from '@depyronick/clickhouse-client';

const clickhouse = new ClickHouseClient({
  host: '51.91.178.210',
  port: 8123,
  user: 'default',
  password: '',
  database: 'hm_stats',
});

// Total données reçues
export async function getTotalInPutOctets() {
  return await clickhouse.queryPromise(`
    SELECT SUM(acctinputoctets) AS total_data_received
    FROM hm_stats.sessions
  `);
}

export async function getTotalInPutOctetsPerPerson() {
  return await clickhouse.queryPromise(`
    SELECT acctuniqueid, SUM(acctinputoctets) AS total_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 5
  `);
}

// Moyenne données reçues
export async function getAvgInPutOctets() {
  return await clickhouse.queryPromise(`
    SELECT AVG(acctinputoctets) AS average_data_received
    FROM hm_stats.sessions
  `);
}

export async function getAvgInPutOctetsPerPerson() {
  return await clickhouse.queryPromise(`
    SELECT acctuniqueid, AVG(acctinputoctets) AS average_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 5
  `);
}

// Min données reçues
export async function getMinInPutOctets() {
  return await clickhouse.queryPromise(`
    SELECT MIN(acctinputoctets) AS min_data_received
    FROM hm_stats.sessions
  `);
}

export async function getMinInPutOctetsPerPerson() {
  return await clickhouse.queryPromise(`
    SELECT acctuniqueid, MIN(acctinputoctets) AS min_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 5
  `);
}

// Max données reçues
export async function getMaxInPutOctets() {
  return await clickhouse.queryPromise(`
    SELECT MAX(acctinputoctets) AS max_data_received
    FROM hm_stats.sessions
  `);
}

export async function getMaxInPutOctetsPerPerson() {
  return await clickhouse.queryPromise(`
    SELECT acctuniqueid, MAX(acctinputoctets) AS max_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 5
  `);
}
