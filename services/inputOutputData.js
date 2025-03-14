import { ClickHouseClient } from '@depyronick/clickhouse-client';

const clickhouse = new ClickHouseClient({
  host: '51.91.178.210',
  port: 8123,
  user: 'default',
  password: '',
  database: 'hm_stats',
});

// Total données (envoyées + reçues)
export async function getTotalInOutOctets() {
  return await clickhouse.queryPromise(`
    SELECT SUM(acctoutputoctets + acctinputoctets) AS total_data
    FROM hm_stats.sessions
  `);
}

export async function getTotalInOutOctetsPerPerson() {
  return await clickhouse.queryPromise(`
    SELECT acctuniqueid, SUM(acctoutputoctets + acctinputoctets) AS total_data
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 5
  `);
}

// Moyenne données (envoyées + reçues)
export async function getAvgInOutOctets() {
  return await clickhouse.queryPromise(`
    SELECT AVG(acctoutputoctets + acctinputoctets) AS average_data
    FROM hm_stats.sessions
  `);
}

export async function getAvgInOutOctetsPerPerson() {
  return await clickhouse.queryPromise(`
    SELECT acctuniqueid, AVG(acctoutputoctets + acctinputoctets) AS average_data
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 5
  `);
}

// Min données (envoyées + reçues)
export async function getMinInOutOctets() {
  return await clickhouse.queryPromise(`
    SELECT MIN(acctoutputoctets + acctinputoctets) AS min_data
    FROM hm_stats.sessions
  `);
}

export async function getMinInOutOctetsPerPerson() {
  return await clickhouse.queryPromise(`
    SELECT acctuniqueid, MIN(acctoutputoctets + acctinputoctets) AS min_data
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 5
  `);
}

// Max données (envoyées + reçues)
export async function getMaxInOutOctets() {
  return await clickhouse.queryPromise(`
    SELECT MAX(acctoutputoctets + acctinputoctets) AS max_data
    FROM hm_stats.sessions
  `);
}

export async function getMaxInOutOctetsPerPerson() {
  return await clickhouse.queryPromise(`
    SELECT acctuniqueid, MAX(acctoutputoctets + acctinputoctets) AS max_data
    FROM hm_stats.sessions
    GROUP BY acctuniqueid
    LIMIT 5
  `);
}
