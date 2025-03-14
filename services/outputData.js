import { testDB } from "../index.js";

// Fonction pour récupérer le total des données envoyées
export async function getOutPutOctets() {
  const result = await testDB.query({
    query: `SELECT SUM(acctoutputoctets) AS total_data_sent
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le total des données envoyées par personne
export async function getOutPutOctetsPerPerson() {
  const result = await testDB.query({
    query: `SELECT acctuniqueid, SUM(acctoutputoctets) AS total_data_sent
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer la moyenne des données envoyées
export async function getAvgOutPutOctets() {
  const result = await testDB.query({
    query: `SELECT AVG(acctoutputoctets) AS average_data_sent
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer la moyenne des données envoyées par personne
export async function getAvgOutPutOctetsPerPerson() {
  const result = await testDB.query({
    query: `SELECT acctuniqueid, AVG(acctoutputoctets) AS average_data_sent
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le minimum des données envoyées
export async function getMinOutPutOctets() {
  const result = await testDB.query({
    query: `SELECT MIN(acctoutputoctets) AS min_data_sent
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le minimum des données envoyées par personne
export async function getMinOutPutOctetsPerPerson() {
  const result = await testDB.query({
    query: `SELECT acctuniqueid, MIN(acctoutputoctets) AS min_data_sent
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le maximum des données envoyées
export async function getMaxOutPutOctets() {
  const result = await testDB.query({
    query: `SELECT MAX(acctoutputoctets) AS max_data_sent
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le maximum des données envoyées par personne
export async function getMaxOutPutOctetsPerPerson() {
  const result = await testDB.query({
    query: `SELECT acctuniqueid, MAX(acctoutputoctets) AS max_data_sent
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}
