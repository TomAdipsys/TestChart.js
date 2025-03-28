import { getNbrAccess, getConnectionTimes } from '../services/clickhouseService.js';

export const getConnections = async (startDate, endDate) => {
    const [resultNbrAccess, resultTime] = await Promise.all([
        getNbrAccess(),
        getConnectionTimes()
    ]);

    const filteredData = resultTime.data.filter(row => {
        const rowDate = new Date(row.date);
        return (!startDate || rowDate >= new Date(startDate)) &&
               (!endDate || rowDate <= new Date(endDate));
    });

    // transition en heure locale
//     const rowDateLocal = new Date(rowDate.getTime() - rowDate.getTimezoneOffset() * 60000);
//     return (!startDate || rowDateLocal >= new Date(startDate)) &&
//            (!endDate || rowDateLocal <= new Date(endDate));
// });


// const rowDateLocal = new Date(rowDate.getTime() - rowDate.getTimezoneOffset() * 60000);
// return (!startDate || rowDateLocal >= new Date(startDate)) &&
//        (!endDate || rowDateLocal <= new Date(endDate));


    return resultNbrAccess.data.map((row, index) => ({ 
        accesspointmac: row.accesspointmac,
        nbraccess: row.nbraccess,
        acctsessiontime: filteredData[index] ? filteredData[index].time : null,
        acctstarttime: filteredData[index] ? filteredData[index].date : null
    }));
};

// Etape supplémentaire pour la gestion des dates : Matching des dates pour les deux tableaux (eviter les erreurs)
// return resultNbrAccess.data.map(row => {
//   const matchingRow = filteredData.find(
//       filteredRow => filteredRow.accesspointmac === row.accesspointmac
//   );

//   return {
//       accesspointmac: row.accesspointmac,
//       nbraccess: row.nbraccess,
//       acctsessiontime: matchingRow ? matchingRow.time : null,
//       acctstarttime: matchingRow ? matchingRow.date : null
//   };
// });
