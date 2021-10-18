const { fetch } = require("../lib/database");

const GET_STAT = `
SELECT
    experience,
    guarantee,
    delivery,
    CASE 
        when client / 1000000 >= 1 then cast(cast(client / 1000000 as varchar(10)) || 'M' as varchar(10)) 
        when client / 1000 >= 1 then cast(cast(client / 1000 as varchar(10)) || 'K' as varchar(10)) 
        else cast(client as varchar(10))        
    END AS client
FROM statistics;
`;

const GET_STAT_FOR_UPDATE = ` 
SELECT *
FROM statistics;
`;

const UPDATE_STAT = `
UPDATE statistics
SET 
    experience = $1,
    client = $2,
    guarantee = $3,
    delivery = $4;
`

exports.getStatistics = () => fetch(GET_STAT);
exports.getStatisticsForUpdate = () => fetch(GET_STAT_FOR_UPDATE);
exports.updateStatistics = data => fetch(UPDATE_STAT, data.experience, data.client, data.guarantee, data.delivery);