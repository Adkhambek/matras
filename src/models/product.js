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
    m.name as model,
    p.is_active,
    p.status
FROM products p
JOIN models m on p.model_id = m.id
WHERE p.is_deleted = '0';
`;

const GET_PRODUCTS_BY_CATEGORY = `
SELECT
    p.id,
    p.name,
    current_price,
    discount_price,
    images,
    detail,
    weight,
    guarantee,
    size,
    capacity,
    p.status
FROM products p
JOIN models m on p.model_id = m.id
WHERE p.is_deleted = '0' AND m.id = $1;
`;

const GET_PRODUCT = `
SELECT *
FROM products
WHERE id = $1;
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
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING id;
`

const DISABLE_PRODUCT = `
UPDATE products 
SET is_active = '1'
WHERE id = $1;
`;

const DELETE_PRODUCT = `
UPDATE products 
SET is_deleted = '1'
WHERE id = $1;
`;

const STATUS_PRODUCT = `
UPDATE products 
SET status = $1
WHERE id = $2;
`

const DISCOUNT_PRODUCT = `
UPDATE products 
SET discount_price = $1
WHERE id = $2;
`

exports.getProducts = () => fetchAll(GET_ACTIVE_PRODUCTS);
exports.getAllProducts = () => fetchAll(GET_ALL_PRODUCTS);
exports.getProduct = (id) => fetch(GET_PRODUCT, id);
exports.getProductsByCategory = (id) => fetch(GET_PRODUCTS_BY_CATEGORY, id);
exports.addProduct = (data, imageArray) => fetch(INSERT_PRODUCT, data.modelId, data.name, data.currentPrice, data.weight, data.size, data.guarantee, data.capacity, data.detail, imageArray);
exports.disableProduct = (id) => fetch(DISABLE_PRODUCT, id);
exports.deleteProduct = (id) => fetch(DELETE_PRODUCT, id);
exports.statusProduct = (status, id) => fetch(STATUS_PRODUCT, status, id);
exports.discountProduct = (discount, id) => fetch(DISCOUNT_PRODUCT, discount, id);
