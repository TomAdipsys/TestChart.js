import { liaisonDB } from "../index.js";
import {startDate_NbrAccess, endDate_NbrAccess} from "../routes/dataRoutes.js";
import {startDate_ConnectionTime, endDate_ConnectionTime} from "../routes/dataRoutes.js";

// Fonction pour récupérer le nombre de connexions par sessions
export async function getNbrAccess(startDate_NbrAccess, endDate_NbrAccess, organization, zone, hotspot) {
  const result = await liaisonDB.query({
    query: `
      SELECT accesspointmac, count(*) AS nbraccess, organizationname, hotspotname, zonename
      FROM hm_stats.sessions
      WHERE (${startDate_NbrAccess ? `acctstarttime >= {start: String}` : '1=1'}) 
      AND (${endDate_NbrAccess ? `acctstarttime <= {end: String}` : '1=1'})
      AND (${organization ? `organizationname = {organization: String}` : '1=1'})
      AND (${hotspot ? `hotspotname = {hotspot: String}` : '1=1'})
      AND (${zone ? `zonename = {zone: String}` : '1=1'})
      GROUP BY accesspointmac, organizationname, hotspotname, zonename
      LIMIT 100
      `,
    query_params: { 
      start: startDate_NbrAccess, 
      end: endDate_NbrAccess, 
      organization, 
      zone,
      hotspot
    },
    format: 'JSON',
  });
  return await result.json();
}

// export async function getFilterOptions() {
//   const result = await liaisonDB.query({
//     query: `
//       SELECT DISTINCT organizationname AS organization, zonename AS zone, hotspotname AS hotspot
//       FROM hm_stats.sessions
//       LIMIT 5
//     `,
//     format: 'JSON',
//   });
//   const data = await result.json();

//   console.log("Données récupérées dans getFilterOptions :", data);
//   return data;

//   // return await result.json();
// }

export async function getFilterOption() {
  const result = await liaisonDB.query({
    query: `
      SELECT o.uuid AS organizationUUID, o.name AS organizationName, z.uuid AS zoneUUID, z.name AS zoneName,
      h.uuid AS hotspotUUID, h.name AS hotspotName
      FROM hm_stats.organizations AS o
      INNER JOIN hm_stats.zones AS z ON o.uuid = z.organizationUUID
      INNER JOIN hm_stats.hotspots AS h ON z.uuid = h.zoneUUID

      INNER JOIN hm_stats.sessions AS s ON h.name = s.hotspotname
    `,
    format: 'JSON',
  });
  const data = await result.json();

  console.log("Données récupérées dans getFilterOptions :", data);
  return data;

  // return await result.json();
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
      LIMIT 5`,
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
      LIMIT 5`,
    query_params: {start :startDate_ConnectionTime, end: endDate_ConnectionTime},
    format: 'JSON',
  })
  return await result.json();
}

