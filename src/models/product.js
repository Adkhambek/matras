const { fetch, fetchAll } = require("../lib/database");

const GET_ACTIVE_PRODUCTS = `
SELECT
    id,
    name,
    current_price,
    discount_price,
    images,
    detail,
    weight,
    guarantee,
    size,
    capacity,
    status
FROM products
WHERE is_active = '0'
AND is_deleted = '0';
`;

const GET_ALL_PRODUCTS = `
SELECT
    p.id,
    p.name,
    current_price,
    weight,
    size,
    p.status,
    m.name as model
FROM products p
JOIN models m on p.model_id = m.id
WHERE p.is_deleted = '0';
`;

const GET_PRODUCT = `
SELECT *
FROM products p
JOIN models m on p.model_id = m.id
WHERE product.id = $1;
`

const INSERT_PRODUCT = `
INSERT INTO products(
    model_id,
    name,
    current_price,
    weight,
    size,
    guarantee,
    capacity,
    detail,
    images
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
`

exports.getProducts = () => fetchAll(GET_ACTIVE_PRODUCTS);
exports.getAllProducts = () => fetchAll(GET_ALL_PRODUNCTS);
exports.getProduct = (id) => fetch(GET_PRODUCT, id);
exports.addProduct = (data, imageArray) => fetch(INSERT_PRODUCT, data.modelId, data.name, data.currentPrice, data.weight, data.size, data.guarantee, data.capacity, data.detail, imageArray);
