const db = require('../db');

const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');

  return result.rows;
};

const createUser = async (name, email, services) => {
  const result = await db.query(
    'INSERT INTO users (name, email, services) VALUES ($1, $2, $3) RETURNING *',
    [name, email, services]
  );
  
  return result.rows[0];
};

const getUser = async (email) => {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1 ',
    [email]
  );
}

const updateUser = async (name ,email,password)=>{
  const result = await db.query(
   'UPDATE users SET name = $1, email = $2, password = $3 WHERE email = $2 RETURNING *',
    [name,email,password]
  )
};

const deleteUser = async (email) => {
  const result = await db.query(
    'DELETE FROM users WHERE email = $1 RETURNING *',
    [email]
  );
}

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
};
