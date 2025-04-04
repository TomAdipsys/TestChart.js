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
    ]);

    return {
      minInOut: minInOut.data[0].min_data_used,
      maxInOut: maxInOut.data[0].max_data_used, 
      avgInOut: avgInOut.data[0].average_data_used,
      totalInOut: totalInOut.data[0].total_data_used,
    };
  }

  export const getInOutputStatsPerPerson = async () => {
    const [totalInOutPerPerson] = await Promise.all([
      getTotalInOutOctetsPerPerson(),
    ]);

    const [minInOutPerPerson, maxInOutPerPerson, avgInOutPerPerson] = await Promise.all([
      getMinInOutOctetsPerPerson(),
      getMaxInOutOctetsPerPerson(),
      getAvgInOutOctetsPerPerson(),
    ]);

    return {
      minInOutPerPerson: minInOutPerPerson.data.map(person => ({
        acctuniqueid: person.acctuniqueid,
        min_data_used: Number(person.min_data_used_per_person)
      })),
      maxInOutPerPerson: maxInOutPerPerson.data.map(person => ({
        acctuniqueid: person.acctuniqueid,
        max_data_used: Number(person.max_data_used_per_person)
      })),
      avgInOutPerPerson: avgInOutPerPerson.data.map(person => ({
        acctuniqueid: person.acctuniqueid,
        avg_data_used: Number(person.average_data_used_per_person)
      })),
    
      totalInOutPerPerson: totalInOutPerPerson.data.map(person => ({
        acctuniqueid: person.acctuniqueid,
        total_data_used: Number(person.total_data_used_per_person)
      }))
    };
  }