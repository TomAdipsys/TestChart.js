// import { getNbrAccess, getConnectionTimes, getConnectionTimeperPerson } from '../services/clickhouseService.js';
import { getNbrAccess } from '../services/clickhouseService.js';
import { getConnectionTime } from '../services/clickhouseService.js';

// startDate_ConnectionTimes, endDate_ConnectionTimes, startDate_ConnectionTimeperPerson, endDate_ConnectionTimeperPerson
export const getNbrConnections = async (startDate_NbrAccess, endDate_NbrAccess, organization, zone, hotspot) => {
    try {
    const [resultNbrAccess, resultTime, resultOrganization, resultZone, resultHotspot] = await Promise.all([
        getNbrAccess(startDate_NbrAccess, endDate_NbrAccess, organization, zone, hotspot),
    ]);
    console.log(resultNbrAccess, resultTime);


    return resultNbrAccess?.data.map((row, index) => ({ 
        accesspointmac: row.accesspointmac,
        nbraccess: row.nbraccess,
        //acctsessiontime: filteredData_NbrAccess[index] ? filteredData_NbrAccess[index].time : null,
        //acctstarttime: filteredData_NbrAccess[index] ? filteredData_NbrAccess[index].date : null
    }));
    } catch (error) {
        console.error('Erreur dans getNbrConnections :', error);
        throw error; // Propagation de l'erreur pour la gestion dans le routeur
    }
};

export const getUserTime = async (startDate_ConnectionTime, endDate_ConnectionTime) => {
    try {
        const [resultUserTime, resultTime] = await Promise.all([
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