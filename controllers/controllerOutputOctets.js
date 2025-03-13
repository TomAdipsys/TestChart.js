import { getMinOutPutOctets, getMaxOutPutOctets, getAvgOutPutOctets } from '../services/outputData.js';
import { getOutPutOctets, getOutPutOctetsPerPerson } from '../services/outputData.js';
import { getMinOutPutOctetsPerPerson, getMaxOutPutOctetsPerPerson, getAvgOutPutOctetsPerPerson } from '../services/outputData.js';

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
    minOut: minOut[0].min_data_sent,
    maxOut: maxOut[0].max_data_sent,
    avgOut: avgOut[0].average_data_sent,

    // Données totales (pas par utilisateur)
    totalDataSent: total[0].total_data_sent,

    // Statistiques par utilisateur
    minOutPers: minOutPers.map(person => ({
      acctuniqueid: person.acctuniqueid,
      min_data_sent: person.min_data_sent
    })),
    maxOutPers: maxOutPers.map(person => ({
      acctuniqueid: person.acctuniqueid,
      max_data_sent: person.max_data_sent
    })),
    avgOutPers: avgOutPers.map(person => ({
      acctuniqueid: person.acctuniqueid,
      avg_data_sent: person.average_data_sent
    })),

    // Données totales par utilisateur
    totalDataSentPerPerson: totalpers.map(person => ({
      acctuniqueid: person.acctuniqueid,
      total_data_sent: person.total_data_sent
    }))
  };
};
