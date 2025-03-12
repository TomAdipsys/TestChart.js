import { getNbConnection, getConnectionTimes } from '../services/clickhouseService.js';

// Fonction pour récupérer les données et les retourner au client
export const getData = async (req, res) => {
  try {
    const [resultNbConnection, resultTime] = await Promise.all([
      getNbConnection(),
      getConnectionTimes()
    ]);

    const formattedResult = resultNbConnection.map((row, index) => ({
      accesspointmac: row.accesspointmac,
      nb: row.nb,
      acctstarttime: resultTime[index] ? resultTime[index].time : null
    }));

    res.json(formattedResult);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des données : ' + err.message);
  }
};

