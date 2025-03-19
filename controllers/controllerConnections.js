import { getNbConnection, getConnectionTimes } from '../services/clickhouseService.js';

export const getConnections = async () => {
  const [resultNbConnection, resultTime] = await Promise.all([
    getNbConnection(),
    getConnectionTimes()
  ]);

  return resultNbConnection.data.map((row, index) => ({ 
    accesspointmac: row.accesspointmac,
    nb: row.nb,
    acctstarttime: resultTime.data[index] ? resultTime.data[index].time : null
  }));
};

// For each 