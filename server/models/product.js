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

const GET_DISCOUNT_PRODUCTS = `
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
    capacity
FROM products
WHERE is_active = '0'
AND is_deleted = '0'
AND status = '2';
`

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
WHERE p.is_deleted = '0' 
AND p.is_active = '0'
AND m.id = $1;
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

const ACTIVE_PRODUCT = `
UPDATE products 
SET is_active = '0'
WHERE id = $1;
`

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

const UPDATE_PRODUCT = `
UPDATE products 
SET 
    model_id = $1,
    name = $2,
    current_price = $3,
    weight = $4,
    size = $5,
    guarantee = $6,
    capacity = $7,
    detail = $8,
    images = $9
WHERE id = $10;
`;

const GET_IMAGE = `
SELECT images
FROM products
WHERE id = $1
`;

exports.getProducts = () => fetchAll(GET_ACTIVE_PRODUCTS);
exports.getAllProducts = () => fetchAll(GET_ALL_PRODUCTS);
exports.getProduct = (id) => fetch(GET_PRODUCT, id);
exports.getProductsByCategory = (id) => fetchAll(GET_PRODUCTS_BY_CATEGORY, id);
exports.getDiscountProducts = () => fetchAll(GET_DISCOUNT_PRODUCTS);
exports.addProduct = (data, imageArray) => fetch(INSERT_PRODUCT, data.modelId, data.name, data.currentPrice, data.weight, data.size, data.guarantee, data.capacity, data.detail, imageArray);
exports.updateProduct = (data, imageArray, id) => fetch(UPDATE_PRODUCT, data.modelId, data.name, data.currentPrice, data.weight, data.size, data.guarantee, data.capacity, data.detail, imageArray, id);
exports.disableProduct = (id) => fetch(DISABLE_PRODUCT, id);
exports.activeProduct = (id) => fetch(ACTIVE_PRODUCT, id);
exports.deleteProduct = (id) => fetch(DELETE_PRODUCT, id);
exports.statusProduct = (status, id) => fetch(STATUS_PRODUCT, status, id);
exports.discountProduct = (discount, id) => fetch(DISCOUNT_PRODUCT, discount, id);
exports.getProductImages = (id) => fetch(GET_IMAGE, id);
