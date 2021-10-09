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

// const GET_ALL_BANNERS = ` 
// SELECT
//     id,
//     title,
//     image,
//     is_active
// FROM banners
// WHERE is_deleted = '0';
// `;

// const GET_BANNER = `
// SELECT
//     id,
//     title,
//     image,
//     TO_CHAR(date, 'yyyy-MM-dd HH24:MI:SS') as date
// FROM banners
// WHERE id = $1;
// `;

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
// const UPDATE_BANNER = `
// UPDATE banners 
// SET title = $1, image = $2
// WHERE id = $3;
// `;
const DISABLE_TECHNOLOGY = `
UPDATE technologies
SET is_active = '1'
WHERE id = $1;
`;

// const DELETE_BANNER = `
// UPDATE banners
// SET is_deleted = '1'
// WHERE id = $1;
// `;


exports.countTechnologies = () => fetch(COUNT_TECHNOLOGIES);
exports.getTechnologies = () => fetchAll(GET_TECHNOLOGIES);
// exports.getAllBanners = () => fetchAll(GET_ALL_BANNERS);
// exports.getBanner = (id) => fetch(GET_BANNER, id)
exports.addTechnology = (data, imageName) => fetch(ADD_TECHNOLOGY, data.name,  data.video, imageName, data.detail);
// exports.updateBanner = (title, image, id) => fetch(UPDATE_BANNER, title, image, id);
exports.disableTechnology = (id) => fetch(DISABLE_TECHNOLOGY , id);
// exports.deleteBanner = (id) => fetch(DELETE_BANNER, id);
