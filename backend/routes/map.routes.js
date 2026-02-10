const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');

// Endpoint pour les arrondissements
router.get('/arrondissements', mapController.getArrondissements);

// Endpoint pour les stations
router.get('/stations', mapController.getStations);

module.exports = router;
