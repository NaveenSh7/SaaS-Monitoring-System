const db = require('../db');
const moment = require('moment-timezone');

const getAllApis = async () => {
  const result = await db.query('SELECT * FROM apis');

  return result.rows;
};

// const createApi = async (user_id , name ,url) => {
//   const result = await db.query(
//     'INSERT INTO apis (user_id , name ,url) VALUES ($1, $2, $3) RETURNING *',
//     [user_id , name ,url]
//   );
  
//   return result.rows[0];
// };

// Create new API and insert initial uptime entry
const createApi = async (apiData) => {
  try {
    const { user_id, name, url, api_type, plan, api_key } = apiData

    // 1. Insert into apis table
    const result = await db.query(
      `INSERT INTO apis (user_id, name, url, api_type, plan,api_key) 
       VALUES ($1, $2, $3, $4, $5,$6) 
       RETURNING *`,
      [user_id, name, url, api_type, plan, api_key]
    )

    const newApi = result.rows[0]

    // 2. Immediately insert into uptimes table
        // const started_at =  moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    await db.query(
      `INSERT INTO uptimes (api_id )
       VALUES ($1 )`,
      [newApi.id]
    )

    return newApi
  } catch (error) {
    console.error("Error in createApi:", error)
    throw error
  }
}


const getApi = async (user_id)=>{

    const result = await db.query(
        'SELECT * FROM apis WHERE user_id = $1',[user_id]
    );
    
    return result.rows;
 
}
const updateApi = async (api_id , name ,url)=>{

    const result = await db.query(
          'UPDATE apis SET name = $1, url = $2 WHERE id = $3 RETURNING *',[ name ,url, api_id]
    );
    return result.rows[0];
}


module.exports = {

getAllApis,
getApi,
createApi,
updateApi
};


