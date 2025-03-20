import { getNbrAccess, getConnectionTimes } from '../services/clickhouseService.js';

export const getConnections = async () => {
  const [resultNbrAccess, resultTime] = await Promise.all([
    getNbrAccess(),
    getConnectionTimes()
  ]);

  return resultNbrAccess.data.map((row, index) => ({ 
    accesspointmac: row.accesspointmac,
    nbraccess: row.nbraccess,
    time: row.time,
    acctsessiontime: resultTime.data[index] ? resultTime.data[index].time : null,
    date: row.date
  }));
};

// For each 