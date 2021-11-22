const { fetch, fetchAll } = require("../lib/database");

const COUNT_TECHNOLOGIES = `
SELECT count(id)
FROM technologies
WHERE is_deleted = '0';
`;

const GET_TECHNOLOGIES = ` 
SELECT
    id,
    name,
    video,
    thumbnail,
    detail
FROM technologies
WHERE is_active = '0'
AND is_deleted = '0';
`;

const GET_ALL_TECHNOLOGIES = ` 
SELECT
    id,
    name,
    detail,
    video
FROM technologies
WHERE is_deleted = '0';
`;

const GET_TECH_IMAGE = `
SELECT
    thumbnail
FROM technologies
WHERE id = $1;
`;

const ADD_TECHNOLOGY = `
INSERT into technologies(
    name, 
    video,
    thumbnail,
    detail
)
VALUES ($1, $2, $3, $4)
RETURNING id;
`;
const UPDATE_TECHNOLOGY = `
UPDATE technologies 
SET 
    name = $1, 
    video = $2,
    thumbnail = $3,
    detail = $4
WHERE id = $5;
`;
const DISABLE_TECHNOLOGY = `
UPDATE technologies
SET is_active = '1'
WHERE id = $1;
`;

const DELETE_TECHNOLOGY = `
UPDATE technologies
SET is_deleted = '1'
WHERE id = $1;
`;

const GET_TECHNOLOG_BY_ID = `
SELECT * 
FROM technologies
WHERE id = $1
`;

exports.countTechnologies = () => fetch(COUNT_TECHNOLOGIES);
exports.getTechnologies = () => fetchAll(GET_TECHNOLOGIES);
exports.getAllTechnologies = () => fetchAll(GET_ALL_TECHNOLOGIES);
exports.getTechnologyImage = (id) => fetch(GET_TECH_IMAGE, id)
exports.addTechnology = (data, imageName) => fetch(ADD_TECHNOLOGY, data.name,  data.video, imageName, data.detail);
exports.updateTechnology = (data, imageName, id) => fetch(UPDATE_TECHNOLOGY, data.name,  data.video, imageName, data.detail, id);
exports.disableTechnology = (id) => fetch(DISABLE_TECHNOLOGY , id);
exports.deleteTechnology = (id) => fetch(DELETE_TECHNOLOGY, id);
exports.getTechnologyById = (id) => fetch(GET_TECHNOLOG_BY_ID, id);