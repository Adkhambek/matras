const { fetch, fetchAll } = require("../lib/database");

const GET_ALL_INTERESTS = `
SELECT
    id,
    tel,
    is_checked, 
    to_char(date, 'HH24:MI-DD.MM.YYYY') as date
FROM interest
WHERE is_deleted = '0'
ORDER BY is_checked;
`;

const TOTAL_INTERESTS = `
SELECT count(*) as total
FROM interest
WHERE is_deleted = '0';
`

const PAGINATION = `
SELECT 
    id,
    tel,
    is_checked, 
    to_char(date, 'HH24:MI-DD.MM.YYYY') as date
FROM interest
WHERE is_deleted = '0'
ORDER BY is_checked
OFFSET $1 LIMIT $2;
`;

const SEARCH = `
SELECT 
    id,
    tel,
    is_checked, 
    to_char(date, 'HH24:MI-DD.MM.YYYY') as date
FROM interest
WHERE is_deleted = '0'
AND tel ILIKE '%'||$1||'%'
ORDER BY is_checked;
`;

const ADD_INTEREST = `
INSERT into interest(tel)
VALUES ($1);
`;
 
const CHECK_INTEREST = `
UPDATE interest 
SET is_checked = '1'
WHERE id = $1;
`;

const UNCHECK_INTEREST = `
UPDATE interest 
SET is_checked = '0'
WHERE id = $1;
`;

const DELETE_INTEREST = `
UPDATE interest 
SET is_deleted = '1'
WHERE id = $1;
`;

exports.totalInterests = () => fetch(TOTAL_INTERESTS);
exports.getAllInterests = () => fetchAll(GET_ALL_INTERESTS);
exports.pagination = (offset, limit) => fetchAll(PAGINATION, offset, limit);
exports.search = (key) => fetchAll(SEARCH, key);
exports.addInterest = (phone) => fetch(ADD_INTEREST, phone);
exports.checkInterest = (id) => fetch(CHECK_INTEREST, id);
exports.unCheckInterest = (id) => fetch(UNCHECK_INTEREST, id);
exports.deleteInterest = (id) => fetch(DELETE_INTEREST, id);