import { getConnections } from './controllerConnections.js';
import { getOutputStats } from './controllerOutputOctets.js';
import { getInputStats } from './controllerInputOctets.js';

export const getData = async (req, res) => {
  try {
    const [connections, outputStats, inputStats] = await Promise.all([
      getConnections(),
      getOutputStats(),
      getInputStats()
    ]);

    res.json({
      connections,
      stats: { ...outputStats, ...inputStats }
    });
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des données : ' + err.message);
  }
};
