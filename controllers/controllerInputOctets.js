import {getMinInPutOctets, getMaxInPutOctets, getAvgInPutOctets,} from '../services/inputData.js';
import {getTotalInPutOctets, getTotalInPutOctetsPerPerson} from '../services/inputData.js';
import {getMinInPutOctetsPerPerson, getMaxInPutOctetsPerPerson, getAvgInPutOctetsPerPerson} from '../services/inputData.js';


export const getInputStats = async () => {
  const [minIn, maxIn, avgIn] = await Promise.all([
    getMinInPutOctets(),
    getMaxInPutOctets(),
    getAvgInPutOctets()
  ]);

  const [totalIn, totalInPerPerson] = await Promise.all([
    getTotalInPutOctets(),
    getTotalInPutOctetsPerPerson(),
  ]);

  const [minInPerPerson, maxInPerPerson, avgInPerPerson] = await Promise.all([
    getMinInPutOctetsPerPerson(),
    getMaxInPutOctetsPerPerson(),
    getAvgInPutOctetsPerPerson(),
  ]);

  return {
    minIn: minIn.data[0].min_data_received,
    maxIn: maxIn.data[0].max_data_received,
    avgIn: avgIn.data[0].average_data_received,
    totalIn: totalIn.data[0].total_data_received,
    totalInPerPerson,
    minInPerPerson,
    maxInPerPerson,
    avgInPerPerson
  };
};
