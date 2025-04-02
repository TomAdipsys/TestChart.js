import { liaisonDB } from "../index.js";

export async function getTotalInOutOctets() {
  const result = await liaisonDB.query({
    query: `SELECT SUM(acctoutputoctets + acctinputoctets) AS total_data_used
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

export async function getTotalInOutOctetsPerPerson() {
  const result = await liaisonDB.query({
    query: `SELECT acctuniqueid, SUM(acctoutputoctets + acctinputoctets) AS total_data_used_per_person
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

export async function getAvgInOutOctets() {
  const result = await liaisonDB.query({
    query: `SELECT AVG(acctoutputoctets + acctinputoctets) AS average_data_used
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

export async function getAvgInOutOctetsPerPerson() {
  const result = await liaisonDB.query({
    query: `SELECT acctuniqueid, AVG(acctoutputoctets + acctinputoctets) AS average_data_used_per_person
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

export async function getMinInOutOctets() {
  const result = await liaisonDB.query({
    query: `SELECT MIN(acctoutputoctets + acctinputoctets) AS min_data_used
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

export async function getMinInOutOctetsPerPerson() {
  const result = await liaisonDB.query({
    query: `SELECT acctuniqueid, MIN(acctoutputoctets + acctinputoctets) AS min_data_used_per_person
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

export async function getMaxInOutOctets() {
  const result = await liaisonDB.query({
    query: `SELECT MAX(acctoutputoctets + acctinputoctets) AS max_data_used
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

export async function getMaxInOutOctetsPerPerson() {
  const result = await liaisonDB.query({
    query: `SELECT acctuniqueid, MAX(acctoutputoctets + acctinputoctets) AS max_data_used_per_person
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}
