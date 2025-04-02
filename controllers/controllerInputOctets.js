import { 
  getMinInPutOctets, 
  getMaxInPutOctets, 
  getAvgInPutOctets, 
  getTotalInPutOctets, 
  getTotalInPutOctetsPerPerson, 
  getMinInPutOctetsPerPerson, 
  getMaxInPutOctetsPerPerson, 
  getAvgInPutOctetsPerPerson 
} from '../services/inputData.js';

export const getInputStats = async () => {
  
  const [minIn, maxIn, avgIn] = await Promise.all([
    getMinInPutOctets(),
    getMaxInPutOctets(),
    getAvgInPutOctets()
  ]);

  const [totalIn, totalInPerPerson] = await Promise.all([
    getTotalInPutOctets(),
  ]);

  return {
    minIn: minIn.data[0].min_data_received,
    maxIn: maxIn.data[0].max_data_received,
    avgIn: avgIn.data[0].average_data_received,
  
    totalIn: totalIn.data[0].total_data_received,
    };
}


export const getInputStatsPerPerson = async () => {

  const [totalInPerPerson] = await Promise.all([
    getTotalInPutOctetsPerPerson(),
  ]);

  const [minInPerPerson, maxInPerPerson, avgInPerPerson] = await Promise.all([
    getMinInPutOctetsPerPerson(),
    getMaxInPutOctetsPerPerson(),
    getAvgInPutOctetsPerPerson(),
  ]);

  return {  
    minInPerPerson: minInPerPerson.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      min_data_received: person.min_data_received_per_person
    })),
    maxInPerPerson: maxInPerPerson.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      max_data_received: person.max_data_received_per_person
    })),
    avgInPerPerson: avgInPerPerson.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      avg_data_received: person.average_data_received_per_person
    })),
  
    totalInPerPerson: totalInPerPerson.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      total_data_received: person.total_data_received_per_person
    }))
  };
}