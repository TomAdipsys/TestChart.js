import express from 'express';
import { getNbrConnections } from '../controllers/controllerConnections.js';
import { getUserTime } from '../controllers/controllerConnections.js';

import { getInputStats } from '../controllers/controllerInputOctets.js';
import { getOutputStats } from '../controllers/controllerOutputOctets.js';
import { getInOutputStats } from '../controllers/controllerInOutputOctets.js';

import { getInputStatsPerPerson } from '../controllers/controllerInputOctets.js';
import { getOutputStatsPerPerson } from '../controllers/controllerOutputOctets.js';
import { getInOutputStatsPerPerson } from '../controllers/controllerInOutputOctets.js';

import { getFilters } from '../controllers/controllerConnections.js';

export const dataRoutes = express.Router();
export let startDate_ConnectionTime = undefined;
export let endDate_ConnectionTime = undefined;
export let startDate_NbrAccess = undefined;
export let endDate_NbrAccess = undefined
export let organization = undefined;
export let zone = undefined;
export let hotspot = undefined;

// ça fonctionne pas
dataRoutes.get('/filters', async (req, res) => {
    try {
        // console.log("Requête reçue pour /filters :", req.query);
        const filters = await getFilters();
        // console.log("Filtres envoyés :", filters);
        res.json(filters);
    } catch (error) {
        console.error("Erreur dans la route /filters :", error);
        res.status(500).send(`Error retrieving filters: ${error}`);
    }
});

dataRoutes.get('/nbraccess', async (req, res) => {
    try {
        // console.log("Requête reçue pour /nbraccess :", req.query);

        startDate_NbrAccess = req.query.startDate_NbrAccess.substring(0, 10) || undefined;
        endDate_NbrAccess = req.query.endDate_NbrAccess.substring(0, 10) || undefined;
        organization = req.query.organization || undefined; 
        zone = req.query.zone || undefined;
        hotspot = req.query.hotspot || undefined;
        const connections = await getNbrConnections(startDate_NbrAccess, endDate_NbrAccess, organization, zone, hotspot);

        // console.log("Paramètres traités :", {
        //     startDate_NbrAccess,
        //     endDate_NbrAccess,
        //     organization,
        //     zone,
        //     hotspot,
        // });

        res.json(connections);
    } catch (error) {
        res.status(500).send(`Error retrieving connection times data : ${error}`);
    }
});

dataRoutes.get('/usertime', async (req, res) => {
    try {
        startDate_ConnectionTime = req.query.startDate_ConnectionTime.substring(0, 10) || undefined;
        endDate_ConnectionTime = req.query.endDate_ConnectionTime.substring(0, 10) || undefined;
        organization = req.query.organization || undefined; 
        zone = req.query.zone || undefined;
        hotspot = req.query.hotspot || undefined;
        const connections = await getUserTime(startDate_ConnectionTime, endDate_ConnectionTime);

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


dataRoutes.get('/stats/perperson', async (req, res) => {
    try {
        const [inputStatsPerPerson, outputStatsPerPerson, inoutputStatsPerPerson] = await Promise.all([
            getInputStatsPerPerson(),
            getOutputStatsPerPerson(),
            getInOutputStatsPerPerson()
        ]);
        console.log('in', inputStatsPerPerson);
        console.log('out', outputStatsPerPerson);
        res.json({
            stats: {
                inputStatsPerPerson, 
                outputStatsPerPerson, 
                inoutputStatsPerPerson
            }
        });
    } catch (error) {
        res.status(500).send('Error retrieving stats data');
    }
});
