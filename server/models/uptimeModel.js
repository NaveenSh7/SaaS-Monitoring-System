const db = require('../db');
const moment = require('moment-timezone');

// add a status change 
const createUptime = async (api_id ,status ) => {
const started_at = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

    const result = await db.query (
        'INSERT INTO uptimes (api_id ,status,started_at) VALUES ($1 ,$2, $3) RETURNING *',
        [api_id ,status,started_at] );

     return result.rows[0];
};

// update status and times
const updateUptime = async (id) => {

    const ended_at =  moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

  const result = await db.query(
    'UPDATE uptimes SET ended_at = $1 WHERE  id=$2 RETURNING *',
    [ended_at,id]
  );
  return result.rows[0];
};


// Get uptimes
const getUptime = async (api_id)=>{
   
const result = await db.query(
    'SELECT * FROM uptimes WHERE api_id = $1 ',[api_id]
);

     return result.rows;
};


module.exports = {
createUptime,
updateUptime,
getUptime
};
