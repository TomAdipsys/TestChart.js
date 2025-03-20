// import express from 'express';
// import { getData } from '../controllers/dataController.js';


// const router = express.Router();

// router.get('/', getData);

// export default router;
import express from 'express';
import { getConnections } from '../controllers/controllerConnections.js';
import { getInputStats } from '../controllers/controllerInputOctets.js';
import { getOutputStats } from '../controllers/controllerOutputOctets.js';
import { getInOutputStats } from '../controllers/controllerInOutputOctets.js';

const router = express.Router();

// Route to get connections
router.get('/connections', async (req, res) => {
    try {
        const connections = await getConnections();
        res.json(connections); 
    } catch (error) {
        res.status(500).send('Error retrieving connections data');
    }
});

router.get('/stats', async (req, res) => {
    try {
        const [inputStats, outputStats, inoutputStats] = await Promise.all([
            getInputStats(),
            getOutputStats(),
            getInOutputStats()
        ]);

        res.json({
            stats: {
                inputStats,
                outputStats,
                inoutputStats
            }
        });
    } catch (error) {
        res.status(500).send('Error retrieving stats data');
    }
});
export default router;