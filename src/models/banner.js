const { fetch, fetchAll } = require("../lib/database");

const GET_BANNERS = `
SELECT * FROM banners
WHERE is_active = '0';
`;

const GET_BANNER = `
SELECT * FROM banners
WHERE id = $1;
`

const ADD_BANNER = `
INSERT into banners(title, image)
VALUES ($1, $2);
`
const UPDATE_BANNER = `
UPDATE banners 
SET title = $1, image = $2
WHERE id = $3;
`

exports.getBanners = () => fetchAll(GET_BANNERS);
exports.getBanner = (id) => fetch(GET_BANNER, id)
exports.addBanner = (title, image) => fetch(ADD_BANNER, title, image);
exports.updateBanner = (title, image, id) => fetch(UPDATE_BANNER, image, title, id);
