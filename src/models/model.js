const { fetch, fetchAll } = require("../lib/database");

const GET_ACTIVE_MODELS = `
SELECT
    id,
    name
FROM models
WHERE is_active = '0';
`;

const GET_ALL_MODELS = `
SELECT *
FROM models;
`;

const GET_MODEL = `
SELECT *
FROM models
WHERE id = $1;
`;

const ADD_MODEL = `
INSERT into models(name)
VALUES ($1);
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

exports.getActiveModels = () => fetchAll(GET_ACTIVE_MODELS);
exports.getAllModels = () => fetchAll(GET_ALL_MODELS);
exports.getModel = (id) => fetch(GET_MODEL, id);
exports.addModel = (modelName) => fetch(ADD_MODEL, modelName);
exports.updateModel = (modelName, id) => fetch(UPDATE_MODEL, modelName, id);
exports.disableModel = (id) => fetch(DISABLE_MODEL, id);