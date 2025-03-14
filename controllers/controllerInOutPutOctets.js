import {
  getMinInOutOctets,
  getMaxInOutOctets,
  getAvgInOutOctets,
  getTotalInOutOctets,
  getTotalInOutOctetsPerPerson,
  getMinInOutOctetsPerPerson,
  getMaxInOutOctetsPerPerson,
  getAvgInOutOctetsPerPerson
} from '../services/inputOutputData.js';

export const getInOutputStats = async () => {
  try {
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
      minInOut: minInOut?.data[0]?.min_data_received ?? 0,
      maxInOut: maxInOut?.data[0]?.max_data_received ?? 0, 
      avgInOut: avgInOut?.data[0]?.average_data_received ?? 0,
      totalInOut: totalInOut?.data[0]?.total_data_received ?? 0,
      totalInOutPerPerson: totalInOutPerPerson.data ?? [],
      minInOutPerPerson: minInOutPerPerson.data ?? [],
      maxInOutPerPerson: maxInOutPerPerson.data ?? [],
      avgInOutPerPerson: avgInOutPerPerson.data ?? []
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques d'entrées/sorties :", error);
    return {
      minInOut: 0,
      maxInOut: 0,
      avgInOut: 0,
      totalInOut: 0,
      totalInOutPerPerson: [],
      minInOutPerPerson: [],
      maxInOutPerPerson: [],
      avgInOutPerPerson: []
    };
  }
};
