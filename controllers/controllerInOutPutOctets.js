import {getMinInOutOctets, getMaxInOutOctets, getAvgInOutOctets,} from '../services/inputOutputData.js';
import {getTotalInOutOctets, getTotalInOutOctetsPerPerson} from '../services/inputOutputData.js';
import {getMinInOutOctetsPerPerson, getMaxInOutOctetsPerPerson, getAvgInOutOctetsPerPerson} from '../services/inputOutputData.js';

export const getInOutputStats = async () => {
  const [minInOut, maxInOut, avgInOut] = await Promise.all([
    getMinInOutOctets(),
    getMaxInOutOctets(),
    getAvgInOutOctets()
  ]);

  const [totalInOut, totalInOutPerPerson] = await Promise.all([
    getTotalInOutOctets(),
    getTotalInOutOctetsPerPerson(),
  ]);

  const [minInOutPerPerson, maxInOutPerPerson, avgInOutPerPerson] = await Promise.all([
    getMinInOutOctetsPerPerson(),
    getMaxInOutOctetsPerPerson(),
    getAvgInOutOctetsPerPerson(),
  ]);

  return {
    minInOut: minInOut[0].min_data_received,
    maxInOut: maxInOut[0].max_data_received,
    avgInOut: avgInOut[0].average_data_received,
    totalInOut: totalInOut[0].total_data_received,
    totalInOutPerPerson,
    minInOutPerPerson,
    maxInOutPerPerson,
    avgInOutPerPerson
  };
};
