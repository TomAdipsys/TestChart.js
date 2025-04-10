import { getNbrAccess, getConnectionTimes, getConnectionTimeperPerson } from '../services/clickhouseService.js';

// startDate_ConnectionTimes, endDate_ConnectionTimes, startDate_ConnectionTimeperPerson, endDate_ConnectionTimeperPerson
export const getConnections = async (startDate_NbrAccess, endDate_NbrAccess) => {
    const [resultNbrAccess, resultTime] = await Promise.all([
        getNbrAccess(startDate_NbrAccess, endDate_NbrAccess),
        // getConnectionTimes(startDate_ConnectionTimes, endDate_ConnectionTimes)
    ]);

    const filteredData_NbrAccess = resultTime.data.filter(row => {
        const rowDate = new Date(row.date);
        return (!startDate_NbrAccess || rowDate >= new Date(startDate_NbrAccess)) &&
               (!endDate_NbrAccess || rowDate <= new Date(endDate_NbrAccess));
    });

    return resultNbrAccess.data.map((row, index) => ({ 
        accesspointmac: row.accesspointmac,
        nbraccess: row.nbraccess,
        acctsessiontime: filteredData_NbrAccess[index] ? filteredData_NbrAccess[index].time : null,
        acctstarttime: filteredData_NbrAccess[index] ? filteredData_NbrAccess[index].date : null
    }));

    // const filteredData_ConnectionTimes = resultTime.data.filter(row => {
    //     const rowDate = new Date(row.date);
    //     return (!startDate_ConnectionTimes || rowDate >= new Date(startDate_ConnectionTimes)) &&
    //            (!endDate_ConnectionTimes || rowDate <= new Date(endDate_ConnectionTimes));
    // });

    // return resultNbrAccess.data.map((row, index) => ({ 
    //     accesspointmac: row.accesspointmac,
    //     nbraccess: row.nbraccess,
    //     acctsessiontime: filteredData_ConnectionTimes[index] ? filteredData_ConnectionTimes[index].time : null,
    //     acctstarttime: filteredData_ConnectionTimes[index] ? filteredData_ConnectionTimes[index].date : null
    // }));
};



    // transition en heure locale
//     const rowDateLocal = new Date(rowDate.getTime() - rowDate.getTimezoneOffset() * 60000);
//     return (!startDate || rowDateLocal >= new Date(startDate)) &&
//            (!endDate || rowDateLocal <= new Date(endDate));


// const rowDateLocal = new Date(rowDate.getTime() - rowDate.getTimezoneOffset() * 60000);
// return (!startDate || rowDateLocal >= new Date(startDate)) &&
//        (!endDate || rowDateLocal <= new Date(endDate));
