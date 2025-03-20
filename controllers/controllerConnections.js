import { getNbrAccess, getConnectionTimes, getConnectionTimeperPerson} from '../services/clickhouseService.js';

export const getConnections = async () => {
  const [resultNbrAccess] = await Promise.all([
    getNbrAccess()
  ]);

  return resultNbrAccess.data.map((row, index) => ({ 
    accesspointmac: row.accesspointmac,
    nbraccess: row.nbraccess,
    // time: row.time,
    // // acctsessiontime: resultTime.data[index] ? resultTime.data[index].time : null,
    // date: row.date
  }));
};
export const getResultTime = async () => {
  const [resultTime] = await Promise.all([
    getConnectionTimes()
  ]);

return resultTime.data.map((row, index) => ({
  accesspointmac: row.accesspointmac,
  time: row.time,
  date: row.date
}));
};

export const getResultTimePerPerson = async () => {
  const [resultTimePerPerson] = await Promise.all([
    getConnectionTimeperPerson()
  ]);

  return resultTimePerPerson.data.map((row, index) => ({
    accesspointmac: row.accesspointmac,
    total_time_per_pers: row.total_time_per_pers
  }));
};
// For each 