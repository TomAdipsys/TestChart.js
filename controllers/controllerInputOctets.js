import { getMinInPutOctets, getMaxInPutOctets, getAvgInPutOctets } from '../services/inputData.js';

export const getInputStats = async () => {
  const [minIn, maxIn, avgIn] = await Promise.all([
    getMinInPutOctets(),
    getMaxInPutOctets(),
    getAvgInPutOctets()
  ]);

  return {
    minIn: minIn[0].min_data_received,
    maxIn: maxIn[0].max_data_received,
    avgIn: avgIn[0].average_data_received
  };
};
