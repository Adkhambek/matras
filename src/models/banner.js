const { fetch, fetchAll } = require("../lib/database");

const GET_BANNERS = `
SELECT * FROM banners
WHERE is_active = '0';
`;

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
exports.addBanner = (data) => fetch(ADD_BANNER, data.title, data.image);
exports.updateBanner = (data, id) => fetch(UPDATE_BANNER, data.title, data.image, id);
