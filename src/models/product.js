const { fetch, fetchAll } = require("../lib/database");

const GET_ACTIVE_PRODUCTS = `
SELECT
    id,
    name,
    current_prize,
    discount_prize,
    images,
    detail,
    weight,
    guarantee,
    size,
    capacity,
    status
FROM banners
WHERE is_active = '0';
`;