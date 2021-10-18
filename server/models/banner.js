const { fetch, fetchAll } = require("../lib/database");

const COUNT_BANNERS = `
SELECT count(id)
FROM banners
WHERE is_deleted = '0';
`;

const GET_BANNERS = ` 
SELECT
    id,
    title,
    image
FROM banners
WHERE is_active = '0'
AND is_deleted = '0';
`;

const GET_ALL_BANNERS = ` 
SELECT
    id,
    title,
    image,
    is_active
FROM banners
WHERE is_deleted = '0';
`;

const GET_BANNER = `
SELECT
    id,
    title,
    image,
    TO_CHAR(date, 'yyyy-MM-dd HH24:MI:SS') as date
FROM banners
WHERE id = $1;
`;

const ADD_BANNER = `
INSERT into banners(title, image)
VALUES ($1, $2);
`;
const UPDATE_BANNER = `
UPDATE banners 
SET title = $1, image = $2
WHERE id = $3;
`;
const DISABLE_BANNER = `
UPDATE banners
SET is_active = '1'
WHERE id = $1;
`;

const DELETE_BANNER = `
UPDATE banners
SET is_deleted = '1'
WHERE id = $1;
`;


exports.countBanners = () => fetch(COUNT_BANNERS);
exports.getBanners = () => fetchAll(GET_BANNERS);
exports.getAllBanners = () => fetchAll(GET_ALL_BANNERS);
exports.getBanner = (id) => fetch(GET_BANNER, id)
exports.addBanner = (title, image) => fetch(ADD_BANNER, title, image);
exports.updateBanner = (title, image, id) => fetch(UPDATE_BANNER, title, image, id);
exports.disableBanner = (id) => fetch(DISABLE_BANNER, id);
exports.deleteBanner = (id) => fetch(DELETE_BANNER, id);
