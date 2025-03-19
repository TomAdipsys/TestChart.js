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
  // Récupérer les statistiques globales
  const [minOut, maxOut, avgOut] = await Promise.all([
    getMinOutPutOctets(),
    getMaxOutPutOctets(),
    getAvgOutPutOctets()
  ]);

  // Récupérer les données totales
  const [total, totalpers] = await Promise.all([
    getOutPutOctets(),
    getOutPutOctetsPerPerson(),
  ]);

  // Récupérer les statistiques par utilisateur
  const [minOutPers, maxOutPers, avgOutPers] = await Promise.all([
    getMinOutPutOctetsPerPerson(),
    getMaxOutPutOctetsPerPerson(),
    getAvgOutPutOctetsPerPerson(),
  ]);

  // Retourner les données formatées
  return {
    // Statistiques globales
    minOut: minOut.data[0].min_data_sent,
    maxOut: maxOut.data[0].max_data_sent,
    avgOut: avgOut.data[0].average_data_sent,

    // Données totales (pas par utilisateur)
    totalDataSent: total.data[0].total_data_sent,

    // Statistiques par utilisateur
    minOutPers: minOutPers.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      min_data_sent: person.min_data_sent
    })),
    maxOutPers: maxOutPers.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      max_data_sent: person.max_data_sent
    })),
    avgOutPers: avgOutPers.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      avg_data_sent: person.average_data_sent
    })),

    // Données totales par utilisateur
    totalDataSentPerPerson: totalpers.data.map(person => ({
      acctuniqueid: person.acctuniqueid,
      total_data_sent: person.total_data_sent
    }))
  };
};
