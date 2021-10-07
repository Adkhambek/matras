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
FROM products
WHERE is_active = '0';
`;

exports.getProducts = () => fetchAll(GET_ACTIVE_PRODUCTS)