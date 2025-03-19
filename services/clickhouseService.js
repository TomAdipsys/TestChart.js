import { liaisonDB } from "../index.js";

// Fonction pour récupérer le nombre de connexions
export async function getNbConnection() {
  const result = await liaisonDB.query({
    query:` SELECT DISTINCT(accesspointmac), count(*) AS nb
            FROM hm_stats.sessions    
            GROUP BY accesspointmac 
            LIMIT 10`,
    format:'JSON',
  })
  return await result.json();
}


export async function getConnectionTimes() {
  const result = await liaisonDB.query({
    query:` SELECT DISTINCT(accesspointmac), acctstarttime AS time 
            FROM hm_stats.sessions 
            LIMIT 10`,
    format:'JSON',
  })
  return await result.json();
}

