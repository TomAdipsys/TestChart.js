import { 
  getMinOutPutOctets, 
  getMaxOutPutOctets, 
  getAvgOutPutOctets, 
  getOutPutOctets, 
  getOutPutOctetsPerPerson, 
  getMinOutPutOctetsPerPerson, 
  getMaxOutPutOctetsPerPerson, 
  getAvgOutPutOctetsPerPerson 
} from '../services/outputData.js';

export const getOutputStats = async () => {
  const [minOut, maxOut, avgOut] = await Promise.all([
    getMinOutPutOctets(),
    getMaxOutPutOctets(),
    getAvgOutPutOctets()
  ]);

  const [total, totalpers] = await Promise.all([
    getOutPutOctets(),
  ]);

  return {
    minOut: minOut.data[0].min_data_sent,
    maxOut: maxOut.data[0].max_data_sent,
    avgOut: avgOut.data[0].average_data_sent,

    totalOut: total.data[0].total_data_sent,
  };
};

export const getOutputStatsPerPerson = async () => {
  const [totalpers] = await Promise.all([
    getOutPutOctetsPerPerson(),
  ]);

  const [minOutPers, maxOutPers, avgOutPers] = await Promise.all([
    getMinOutPutOctetsPerPerson(),
    getMaxOutPutOctetsPerPerson(),
    getAvgOutPutOctetsPerPerson(),
  ]);

  return {
    minOutPers: minOutPers.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      min_data_sent: person.min_data_sent_per_person
    })),
    maxOutPers: maxOutPers.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      max_data_sent: person.max_data_sent_per_person
    })),
    avgOutPers: avgOutPers.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      avg_data_sent: person.average_data_sent_per_person
    })),

    totalOutPerPerson: totalpers.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      total_data_sent: person.total_data_sent_per_person
    }))
  };
}
