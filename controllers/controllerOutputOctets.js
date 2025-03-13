import { getMinOutPutOctets, getMaxOutPutOctets, getAvgOutPutOctets } from '../services/outputdata.js';

export const getOutputStats = async () => {
  const [minOut, maxOut, avgOut] = await Promise.all([
    getMinOutPutOctets(),
    getMaxOutPutOctets(),
    getAvgOutPutOctets()
  ]);

  return {
    minOut: minOut[0].min_data_sent,
    maxOut: maxOut[0].max_data_sent,
    avgOut: avgOut[0].average_data_sent
  };
};
