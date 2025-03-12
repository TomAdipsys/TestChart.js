import { ClickHouseClient } from '@depyronick/clickhouse-client';

const clickhouse = new ClickHouseClient({
  host: '51.91.178.210',
  port: 8123,
  user: 'default',
  password: '',
  database: 'hm_stats',
});

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
