const { fetch, fetchAll } = require("../lib/database");

const GET_ADDRESS = ` 
SELECT
    id,
    address,
    target,
    location,
    images,
    is_active
FROM address
WHERE id = $1
AND is_active = '0'
AND is_deleted = '0';
`;

const GET_ALL_ADDRESSES = ` 
SELECT
    id,
    address,
    target,
    location
FROM address
WHERE is_deleted = '0';
`;

const GET_ADDRESS_IMAGES = `
SELECT
    images
FROM address
WHERE id = $1;
`;

const ADD_ADDRESS = `
INSERT into address(
    address,
    target,
    location,
    images
)
VALUES ($1, $2, $3, $4)
RETURNING id;
`;
const UPDATE_ADDRESS = `
UPDATE address 
SET 
    address = $1,
    target = $2,
    location = $3,
    images = $4
WHERE id = $5;
`;
const DISABLE_ADDRESS = `
UPDATE address
SET is_active = '1'
WHERE id = $1;
`;

const DELETE_ADDRESS = `
UPDATE address
SET is_deleted = '1'
WHERE id = $1;
`;

const ACTIVE_ADDRESS = `
UPDATE address
SET is_active = '0'
WHERE id = $1;
`


exports.getAddress = (id) => fetch(GET_ADDRESS, id);
exports.getAllAddresses = () => fetchAll(GET_ALL_ADDRESSES);
exports.getAddressImages = (id) => fetch(GET_ADDRESS_IMAGES, id)
exports.addAddress = (data, imageName) => fetch(ADD_ADDRESS, data.address,  data.target, data.location, imageName);
exports.updateAddress = (data, imageName, id) => fetch(UPDATE_ADDRESS, data.address,  data.target, data.location, imageName, id);
exports.disableAddress = (id) => fetch(DISABLE_ADDRESS , id);
exports.activeAddress = (id) => fetch(ACTIVE_ADDRESS , id);
exports.deleteAddress = (id) => fetch(DELETE_ADDRESS, id);
