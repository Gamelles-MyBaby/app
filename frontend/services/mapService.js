import { api } from './api.js';

export const mapService = {
    getArrondissements: async () => {
        return await api.get('/map/arrondissements');
    },
    getStations: async () => {
        return await api.get('/map/stations');
    }
};
