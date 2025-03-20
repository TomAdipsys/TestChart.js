import { liaisonDB } from "../index.js";

// Fonction pour récupérer le nombre de connexions par sessions
export async function getNbrAccess() {
  const result = await liaisonDB.query({
    query:` SELECT DISTINCT(accesspointmac), count(*) AS nbraccess
            FROM hm_stats.sessions    
            GROUP BY accesspointmac 
            LIMIT 10`,
    format:'JSON',
  })
  return await result.json();
}

export async function getConnectionTimes() {
  const result = await liaisonDB.query({
    query:` SELECT DISTINCT(accesspointmac), acctsessiontime AS time, acctstarttime as date
            FROM hm_stats.sessions 
            LIMIT 10`,
    format:'JSON',
  })
  return await result.json();
}

export async function getConnectionTimeperPerson() {
  const result = await liaisonDB.query({
    query:` SELECT DISTINCT(accesspointmac), SUM(acctsessiontime) AS total_time_per_pers
            FROM hm_stats.sessions
            GROUP BY accesspointmac
            ORDER BY total_time_per_pers DESC
            LIMIT 10`,
    format:'JSON',
  })
  return await result.json();
}
