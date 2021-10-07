const { fetch, fetchAll } = require("../lib/database");

const GET_ACTIVE_MODELS = `
SELECT
    id,
    name
FROM models
WHERE is_active = '0'
AND is_deleted = '0';
`;

const GET_ALL_MODELS = `
SELECT 
    id,
    name,
    is_active
FROM models
WHERE is_deleted = '0';
`;

const GET_MODEL = `
SELECT *
FROM models
WHERE id = $1;
`;

const ADD_MODEL = `
INSERT into models(name)
VALUES ($1) RETURNING id;
`;

const UPDATE_MODEL = `
UPDATE models 
SET name = $1
WHERE id = $2;
`;

const DISABLE_MODEL = `
UPDATE models 
SET is_active = '1'
WHERE id = $1;
`;

const DELETE_MODEL = `
UPDATE models 
SET is_deleted = '1'
WHERE id = $1;
`;

exports.getActiveModels = () => fetchAll(GET_ACTIVE_MODELS);
exports.getAllModels = () => fetchAll(GET_ALL_MODELS);
exports.getModel = (id) => fetch(GET_MODEL, id);
exports.addModel = (modelName) => fetch(ADD_MODEL, modelName);
exports.updateModel = (modelName, id) => fetch(UPDATE_MODEL, modelName, id);
exports.disableModel = (id) => fetch(DISABLE_MODEL, id);
exports.deleteModel = (id) => fetch(DELETE_MODEL, id);