import express from 'express';
import { getConnections } from '../controllers/controllerConnections.js';
import { getInputStats } from '../controllers/controllerInputOctets.js';
import { getOutputStats } from '../controllers/controllerOutputOctets.js';
import { getInOutputStats } from '../controllers/controllerInOutputOctets.js';

export const dataRoutes = express.Router();

dataRoutes.get('/connections', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const connections = await getConnections(startDate, endDate);

        res.json(connections); 
    } catch (error) {
        res.status(500).send('Error retrieving connections data');
    }
});

dataRoutes.get('/stats', async (req, res) => {
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
