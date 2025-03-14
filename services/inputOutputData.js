import { testDB } from "../index.js";

// Fonction pour récupérer le total des données envoyées et reçues
export async function getTotalInOutOctets() {
  const result = await testDB.query({
    query: `SELECT SUM(acctoutputoctets + acctinputoctets) AS total_data
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le total des données envoyées et reçues par personne
export async function getTotalInOutOctetsPerPerson() {
  const result = await testDB.query({
    query: `SELECT acctuniqueid, SUM(acctoutputoctets + acctinputoctets) AS total_data
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer la moyenne des données envoyées et reçues
export async function getAvgInOutOctets() {
  const result = await testDB.query({
    query: `SELECT AVG(acctoutputoctets + acctinputoctets) AS average_data
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer la moyenne des données envoyées et reçues par personne
export async function getAvgInOutOctetsPerPerson() {
  const result = await testDB.query({
    query: `SELECT acctuniqueid, AVG(acctoutputoctets + acctinputoctets) AS average_data
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le minimum des données envoyées et reçues
export async function getMinInOutOctets() {
  const result = await testDB.query({
    query: `SELECT MIN(acctoutputoctets + acctinputoctets) AS min_data
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le minimum des données envoyées et reçues par personne
export async function getMinInOutOctetsPerPerson() {
  const result = await testDB.query({
    query: `SELECT acctuniqueid, MIN(acctoutputoctets + acctinputoctets) AS min_data
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le maximum des données envoyées et reçues
export async function getMaxInOutOctets() {
  const result = await testDB.query({
    query: `SELECT MAX(acctoutputoctets + acctinputoctets) AS max_data
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le maximum des données envoyées et reçues par personne
export async function getMaxInOutOctetsPerPerson() {
  const result = await testDB.query({
    query: `SELECT acctuniqueid, MAX(acctoutputoctets + acctinputoctets) AS max_data
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}
