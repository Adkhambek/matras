const { fetch, fetchAll } = require("../lib/database");

const GET_ALL_ORDERS = `
SELECT
    o.id,
    o.name,
    o.tel,
    p.name as product,
    o.amount,
    o.is_checked
FROM orders o
JOIN products p ON p.id = o.product_id
ORDER BY is_checked, o.id desc;
`;

const TOTAL_ORDERS = `
SELECT count(*) as total
FROM orders;
`;

const PAGINATION = `
SELECT 
    o.id,
    o.name,
    o.tel,
    p.name as product,
    o.amount,
    o.is_checked
FROM orders o
JOIN products p ON p.id = o.product_id
ORDER BY is_checked, o.id desc
OFFSET $1 LIMIT $2;
`;

const SEARCH = `
SELECT 
o.id,
    o.name,
    o.tel,
    p.name as product,
    o.amount,
    o.is_checked
FROM orders o
JOIN products p ON p.id = o.product_id
WHERE o.name ILIKE '%'||$1||'%'
ORDER BY is_checked, o.id desc;
`;

const ADD_ORDER = `
INSERT into orders
(
    name,
    tel,
    product_id,
    amount
)
VALUES ($1, $2, $3, $4);
`;

const CHECK_ORDER = `
UPDATE orders 
SET is_checked = '1'
WHERE id = $1;
`;

const UNCHECK_ORDER = `
UPDATE orders  
SET is_checked = '0'
WHERE id = $1;
`;

exports.totalOrders = () => fetch(TOTAL_ORDERS);
exports.getAllOrders = () => fetchAll(GET_ALL_ORDERS);
exports.pagination = (offset, limit) => fetchAll(PAGINATION, offset, limit);
exports.search = (key) => fetchAll(SEARCH, key);
exports.addOrder = (data) =>
    fetch(ADD_ORDER, data.name, data.phone, data.productId, data.amount);
exports.checkOrder = (id) => fetch(CHECK_ORDER, id);
exports.unCheckOrder = (id) => fetch(UNCHECK_ORDER, id);
