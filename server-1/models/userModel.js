const db = require('../db');

const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');

  return result.rows;
};

// const createUser = async (name, email, services) => {
//   const result = await db.query(
//     'INSERT INTO users (name, email, services) VALUES ($1, $2, $3) RETURNING *',
//     [name, email, services]
//   );
  
//   return result.rows[0];
// };

const createUser = async (name, email, services = []) => {
  const result = await db.query(
    'INSERT INTO users (name, email, services) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING *',
    [name, email, services]
  );
  return result.rows[0];
};


const getUser = async (email) => {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1 ',
    [email]
  );
  return result.rows[0];
}

const updateUser = async (name ,email,services)=>{
  const result = await db.query(
   'UPDATE users SET name = $1, email = $2, services = $3 WHERE email = $2 RETURNING *',
    [name,email,services]
  )
};

const deleteUser = async (email) => {
  const result = await db.query(
    'DELETE FROM users WHERE email = $1 RETURNING *',
    [email]
  );
    return result.rows[0];
}
// const updateUserServiceCount = async (user_id, count) => {
//   const result = await db.query(
//     "UPDATE users SET services = $1 WHERE id = $2 RETURNING *",
//     [count, user_id]
//   );

//   return result.rows[0];
// };


module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  // updateUserServiceCount
};
