const db = require('../db');

const getAllApis = async () => {
  const result = await db.query('SELECT * FROM apis');

  return result.rows;
};

const createApi = async (user_id , name ,url) => {
  const result = await db.query(
    'INSERT INTO apis (user_id , name ,url) VALUES ($1, $2, $3) RETURNING *',
    [user_id , name ,url]
  );
  
  return result.rows[0];
};

const getApi = async (user_id)=>{

    const result = await db.query(
        'SELECT * FROM apis WHERE user_id = $1',[user_id]
    );
    return result.rows[0];
 
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
