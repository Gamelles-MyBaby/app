const mapService = require('../services/map.service');

const mapController = {
    /**
     * Retourne les arrondissements en GeoJSON
     */
    getArrondissements: async (req, res) => {
        try {
            const geojson = await mapService.getArrondissements();
            res.status(200).json(geojson);
        } catch (error) {
            console.error('Erreur GeoJSON Arrondissements:', error);
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Retourne les stations en GeoJSON
     */
    getStations: async (req, res) => {
        try {
            const geojson = await mapService.getStations();
            res.status(200).json(geojson);
        } catch (error) {
            console.error('Erreur GeoJSON Stations:', error);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = mapController;
