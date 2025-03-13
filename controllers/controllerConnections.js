import { getNbConnection, getConnectionTimes } from '../services/clickhouseService.js';

export const getConnections = async () => {
  const [resultNbConnection, resultTime] = await Promise.all([
    getNbConnection(),
    getConnectionTimes()
  ]);

  return resultNbConnection.map((row, index) => ({
    accesspointmac: row.accesspointmac,
    nb: row.nb,
    acctstarttime: resultTime[index] ? resultTime[index].time : null
  }));
};
