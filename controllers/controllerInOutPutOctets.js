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
      // Statistiques globales
      minInOut: minInOut.data[0].min_data_used,
      maxInOut: maxInOut.data[0].max_data_used, 
      avgInOut: avgInOut.data[0].average_data_used,
      // Données totales (pas par utilisateur)
      totalInOut: totalInOut.data[0].total_data_used,
 
      // Statistiques par utilisateur
      minInOutPerPerson: minInOutPerPerson.data.map(person => ({
        acctuniqueid: person.acctuniqueid,
        min_data_used: person.min_data_used_per_person
      })),
      maxInOutPerPerson: maxInOutPerPerson.data.map(person => ({
        acctuniqueid: person.acctuniqueid,
        max_data_used: person.max_data_used_per_person
      })),
      avgInOutPerPerson: avgInOutPerPerson.data.map(person => ({
        acctuniqueid: person.acctuniqueid,
        avg_data_used: person.average_data_used_per_person
      })),
    
      // Données totales par utilisateur
      totalInOutPerPerson: totalInOutPerPerson.data.map(person => ({
        acctuniqueid: person.acctuniqueid,
        total_data_used: person.total_data_used_per_person
      }))
    };
  }
