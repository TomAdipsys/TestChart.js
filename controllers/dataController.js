import { getConnections } from './controllerConnections.js';
import { getOutputStats } from './controllerOutputOctets.js';
import { getInputStats } from './controllerInputOctets.js';
import { getInOutputStats } from './controllerInOutPutOctets.js';

export const getData = async (req, res) => {
  try {
    const [connections, outputStats, inputStats, inoutputStats] = await Promise.all([
      getConnections(),
      getOutputStats(),
      getInputStats(),
      getInOutputStats()
    ]);

    res.json({
      connections,
      stats: {
        outputStats: outputStats,
        inputStats: inputStats,
        inoutputStats: inoutputStats
      }
    });

  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des données : ' + err.message);
  }
};
