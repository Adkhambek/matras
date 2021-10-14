const { fetch } = require("../lib/database");

const CHECK_LOGIN = `
SELECT id
FROM admin
WHERE username = $1 AND password = crypt($2, password)
;`;

const FIND_BY_ID = `
SELECT username
FROM admin
WHERE id = $1
`;

const OLD_PASSWORD = `
SELECT password FROM admin
WHERE password = crypt($1, password);
` 

const CHANGE_PASSWORD = `
UPDATE admin
    SET password = crypt($1, password);
`; 

exports.findById = (id) =>fetch(FIND_BY_ID, id);

exports.checkLogin =  (data) => fetch(CHECK_LOGIN, data.username, data.password); 

exports.changePassword = ( newPassword ) => fetch(CHANGE_PASSWORD, newPassword);

exports.oldPassword = (password) => fetch(OLD_PASSWORD, password); 