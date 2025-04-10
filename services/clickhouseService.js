import { liaisonDB } from "../index.js";

// Fonction pour récupérer le nombre de connexions par sessions
export async function getNbrAccess(startDate_NbrAccess, endDate_NbrAccess) {
  const result = await liaisonDB.query({
    query: `
      SELECT accesspointmac, count(*) AS nbraccess
      FROM hm_stats.sessions
      WHERE (${startDate_NbrAccess ? `acctstarttime >= ?` : '1=1'}) 
      AND (${endDate_NbrAccess ? `acctstarttime <= ?` : '1=1'})
      GROUP BY accesspointmac 
      LIMIT 50`,
    query_params: [startDate_NbrAccess, endDate_NbrAccess].filter(param => param != null),
    format: 'JSON',
  })
  const data = await result.json();
  console.log('hi'); 

  console.log('Data from getNbrAccess:', data); // Log the data
  return await result.json();
}

// Fonction pour récupérer les times de connexion avec filtre sur les dates
export async function getConnectionTimes(startDate_ConnectionTimes, endDate_ConnectionTimes) {
  const result = await liaisonDB.query({
    query: `
      SELECT accesspointmac, acctsessiontime AS time, acctstarttime as date
      FROM hm_stats.sessions
      WHERE (${startDate_ConnectionTimes ? `acctstarttime >= ?` : '1=1'}) 
      AND (${endDate_ConnectionTimes ? `acctstarttime <= ?` : '1=1'})
      LIMIT 50`,
    query_params: [startDate_ConnectionTimes, endDate_ConnectionTimes].filter(param => param != null),
    format: 'JSON',
  })
  return await result.json();
}

export async function getConnectionTimeperPerson() {
  const result = await liaisonDB.query({
    query:` SELECT DISTINCT(accesspointmac), SUM(acctsessiontime) AS total_time_per_pers
            FROM hm_stats.sessions
            GROUP BY accesspointmac
            ORDER BY total_time_per_pers DESC
            LIMIT 50`,
    format:'JSON',
  })
  return await result.json();
}

// export async function getConnectionTimeperPerson(startDate_ConnectionTimeperPerson, endDate_ConnectionTimeperPerson) {
//   const result = await liaisonDB.query({
//     query: `
//       SELECT accesspointmac, acctsessiontime AS time, acctstarttime as date
//       FROM hm_stats.sessions
//       WHERE (${startDate_ConnectionTimesperPerson ? `acctstarttime >= ?` : '1=1'}) 
//       AND (${endDate_ConnectionTimesperPerson ? `acctstarttime <= ?` : '1=1'})
//       LIMIT 50`,
//     query_params: [startDateConnectionTimesperPerson, endDateConnectionTimesperPerson].filter(param => param != null),
//     format: 'JSON',
//   })
//   return await result.json();
// }