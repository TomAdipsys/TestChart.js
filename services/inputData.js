import { liaisonDB } from "../index.js";

// Fonction pour récupérer le total des données reçues
export async function getTotalInPutOctets() {
  const result = await liaisonDB.query({
    query: `SELECT SUM(acctinputoctets) AS total_data_received
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le total des données reçues par personne
export async function getTotalInPutOctetsPerPerson() {
  const result = await liaisonDB.query({
    query: `SELECT acctuniqueid, SUM(acctinputoctets) AS total_data_received_per_person
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer la moyenne des données reçues
export async function getAvgInPutOctets() {
  const result = await liaisonDB.query({
    query: `SELECT AVG(acctinputoctets) AS average_data_received
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer la moyenne des données reçues par personne
export async function getAvgInPutOctetsPerPerson() {
  const result = await liaisonDB.query({
    query: `SELECT acctuniqueid, AVG(acctinputoctets) AS average_data_received_per_person
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le minimum des données reçues
export async function getMinInPutOctets() {
  const result = await liaisonDB.query({
    query: `SELECT MIN(acctinputoctets) AS min_data_received
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le minimum des données reçues par personne
export async function getMinInPutOctetsPerPerson() {
  const result = await liaisonDB.query({
    query: `SELECT acctuniqueid, MIN(acctinputoctets) AS min_data_received_per_person
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le maximum des données reçues
export async function getMaxInPutOctets() {
  const result = await liaisonDB.query({
    query: `SELECT MAX(acctinputoctets) AS max_data_received
            FROM hm_stats.sessions`,
    format: 'JSON',
  });
  return await result.json();
}

// Fonction pour récupérer le maximum des données reçues par personne
export async function getMaxInPutOctetsPerPerson() {
  const result = await liaisonDB.query({
    query: `SELECT acctuniqueid, MAX(acctinputoctets) AS max_data_received_per_person
            FROM hm_stats.sessions
            GROUP BY acctuniqueid
            LIMIT 5`,
    format: 'JSON',
  });
  return await result.json();
}
