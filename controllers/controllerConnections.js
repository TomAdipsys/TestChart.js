// import { getNbrAccess, getConnectionTimes, getConnectionTimeperPerson } from '../services/clickhouseService.js';
import { getNbrAccess } from '../services/clickhouseService.js';
import { getConnectionTime } from '../services/clickhouseService.js';
import { getFilterOptions } from '../services/clickhouseService.js';

export const getFilters = async () => {
    try {
      console.log("ControllerConnections.js Appel de getFilters...");
      const filters = await getFilterOptions();
      console.log("ControllerConnections.js Filtres récupérés :", filters);
  
      // Utiliser un Mao pour supprimer les doublons
      return {
        organizations: [...new Map(filters.data
            .filter(row => row.organizationUUID && row.organizationName)
            .map(row => [row.organizationUUID, { uuid: row.organizationUUID, name: row.organizationName }])
        ).values()],
        zones: [...new Map(filters.data
            .filter(row => row.zoneUUID && row.zoneName)
            .map(row => [row.zoneUUID, { uuid: row.zoneUUID, name: row.zoneName, organizationUUID: row.organizationUUID }])
        ).values()],
        hotspots: [...new Map(filters.data
            .filter(row => row.hotspotUUID && row.hotspotName)
            .map(row => [row.hotspotUUID, { uuid: row.hotspotUUID, name: row.hotspotName, zoneUUID: row.zoneUUID }])
        ).values()],
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des filtres :', error);
      throw error;
    }
  };

//   filters.data.map(row => row.organization) :

// Cela extrait toutes les valeurs de la colonne organization.
// new Set() :

// Un Set est une structure de données qui ne permet pas les doublons. En passant le tableau dans un Set, tous les doublons sont automatiquement supprimés.
// [...new Set(...)] :

// Cela convertit le Set en un tableau pour que vous puissiez le retourner dans la réponse.

export const getNbrConnections = async (startDate_NbrAccess, endDate_NbrAccess, organization, zone, hotspot) => {
    try {
        console.log("Appel de getNbrConnections avec :", {
            startDate_NbrAccess,
            endDate_NbrAccess,
            organization,
            zone,
            hotspot,
        });

        const [resultNbrAccess] = await Promise.all([
            getNbrAccess(startDate_NbrAccess, endDate_NbrAccess, organization, zone, hotspot),
        ]);

        console.log("Résultat brut de getNbrAccess :", resultNbrAccess);
// organization || resultNbrAccess.zone || resultNbrAccess.hotspot
        return resultNbrAccess?.data.map(row => ({
            accesspointmac: row.accesspointmac,
            nbraccess: row.nbraccess,
        }));
    } catch (error) {
        console.error('Erreur dans getNbrConnections :', error);
        throw error;
    }
};

export const getUserTime = async (startDate_ConnectionTime, endDate_ConnectionTime) => {
    try {
        const [resultUserTime, resultTime] = await Promise.all([
            // startDate_ConnectionTimes, endDate_ConnectionTimes, startDate_ConnectionTimeperPerson, endDate_ConnectionTimeperPerson
            getConnectionTime(startDate_ConnectionTime, endDate_ConnectionTime),
        ]);
    
        const filteredData_NbrAccess = resultTime.data.filter(row => {
            const rowDate = new Date(row.date);
            return (!startDate_ConnectionTime || rowDate >= new Date(startDate_ConnectionTime)) &&
                   (!endDate_ConnectionTime || rowDate <= new Date(endDate_ConnectionTime));
        });
    
        return resultUserTime.data.map((row, index) => ({ 
            accesspointmac: row.accesspointmac,
            nbraccess: row.nbraccess,
            acctsessiontime: filteredData_NbrAccess[index] ? filteredData_NbrAccess[index].time : null,
            acctstarttime: filteredData_NbrAccess[index] ? filteredData_NbrAccess[index].date : null
        }));
        } catch (error) {
            console.error('Erreur dans getNbrConnections :', error);
            throw error; // Propagation de l'erreur pour la gestion dans le routeur
        }
    };