const db = require('../db');

const mapService = {
    /**
     * Récupère les arrondissements au format GeoJSON
     */
    getArrondissements: async () => {
        // On suppose que la colonne géométrie s'appelle 'geom' (standard PostGIS)
        // et que toutes les autres colonnes sont des propriétés.
        const query = `
            SELECT 
                jsonb_build_object(
                    'type', 'FeatureCollection',
                    'features', COALESCE(jsonb_agg(
                        jsonb_build_object(
                            'type', 'Feature',
                            'geometry', ST_AsGeoJSON(ST_Transform(ST_SetSRID(geom, 2154), 4326))::jsonb,
                            'properties', to_jsonb(t.*) - 'geom'
                        )
                    ), '[]'::jsonb)
                ) as geojson
            FROM "Arrondissement" t;
        `;
        const result = await db.query(query);
        return result.rows[0].geojson;
    },

    /**
     * Récupère les stations au format GeoJSON
     */
    getStations: async () => {
        const query = `
            SELECT 
                jsonb_build_object(
                    'type', 'FeatureCollection',
                    'features', COALESCE(jsonb_agg(
                        jsonb_build_object(
                            'type', 'Feature',
                            'geometry', ST_AsGeoJSON(ST_Transform(ST_SetSRID(geom, 2154), 4326))::jsonb,
                            'properties', to_jsonb(t.*) - 'geom'
                        )
                    ), '[]'::jsonb)
                ) as geojson
            FROM stations t;
        `;
        const result = await db.query(query);
        return result.rows[0].geojson;
    }
};

module.exports = mapService;
