import { liaisonDB } from "../index.js";
import {startDate_NbrAccess, endDate_NbrAccess} from "../routes/dataRoutes.js";
import {startDate_ConnectionTime, endDate_ConnectionTime} from "../routes/dataRoutes.js";

// Fonction pour récupérer le nombre de connexions par sessions
export async function getNbrAccess(startDate_NbrAccess, endDate_NbrAccess) {
  const result = await liaisonDB.query({
    query: `
      SELECT accesspointmac, count(*) AS nbraccess
      FROM hm_stats.sessions
      WHERE (${startDate_NbrAccess ? `acctstarttime >= {start: String}` : '1=1'}) 
      AND (${endDate_NbrAccess ? `acctstarttime <= {end: String}` : '1=1'})
      GROUP BY accesspointmac 
      LIMIT 50`,
    query_params: { start : startDate_NbrAccess, end : endDate_NbrAccess},
    format: 'JSON',
  })
  return await result.json();
}

// Fonction pour récupérer les times de connexion avec filtre sur les dates
export async function getConnectionTime(startDate_ConnectionTime, endDate_ConnectionTime) {
  console.log(startDate_ConnectionTime, endDate_ConnectionTime);
  const result = await liaisonDB.query({
    query: `
      SELECT accesspointmac, acctsessiontime AS time, acctstarttime as date
      FROM hm_stats.sessions
      WHERE (${startDate_ConnectionTime ? `acctstarttime >= {start: String}` : '1=1'}) 
      AND (${endDate_ConnectionTime ? `acctstarttime <= {end: String}` : '1=1'})
      LIMIT 50`,
    query_params: {start :startDate_ConnectionTime, end: endDate_ConnectionTime},
    format: 'JSON',
  })
  return await result.json();
}

export async function getConnectionTimeperPerson(startDate_ConnectionTime, endDate_ConnectionTime) {
  console.log(startDate_ConnectionTime, endDate_ConnectionTime);
  const result = await liaisonDB.query({
    query: `
      SELECT accesspointmac, SUM(acctsessiontime) AS total_time_per_pers, acctstarttime as date
      FROM hm_stats.sessions
      WHERE 
      BETWEEN (${startDate_ConnectionTime ? `acctstarttime >= {start: String}` : '1=1'})
      AND (${endDate_ConnectionTime ? `acctstarttime <= {end: String}` : '1=1'})
      GROUP BY accesspointmac
      ORDER BY total_time_per_pers DESC
      LIMIT 50`,
    query_params: {start :startDate_ConnectionTime, end: endDate_ConnectionTime},
    format: 'JSON',
  })
  return await result.json();
}