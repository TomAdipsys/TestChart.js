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
  return clickhouse.queryPromise(`
    SELECT SUM(acctinputoctets) AS total_data_received
    FROM hm_stats.sessions
  `);
}

export async function getTotalInPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, SUM(acctinputoctets) AS total_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10
  `);
}

// Moyenne données reçues
export async function getAvgInPutOctets() {
  return clickhouse.queryPromise(`
    SELECT AVG(acctinputoctets) AS average_data_received
    FROM hm_stats.sessions
  `);
}

export async function getAvgInPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, AVG(acctinputoctets) AS average_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10
  `);
}

// Min données reçues
export async function getMinInPutOctets() {
  return clickhouse.queryPromise(`
    SELECT MIN(acctinputoctets) AS min_data_received
    FROM hm_stats.sessions
  `);
}

export async function getMinInPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, MIN(acctinputoctets) AS min_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10
  `);
}

// Max données reçues
export async function getMaxInPutOctets() {
  return clickhouse.queryPromise(`
    SELECT MAX(acctinputoctets) AS max_data_received
    FROM hm_stats.sessions
  `);
}

export async function getMaxInPutOctetsPerPerson() {
  return clickhouse.queryPromise(`
    SELECT acctuniqueid, MAX(acctinputoctets) AS max_data_received
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 10
  `);
}
