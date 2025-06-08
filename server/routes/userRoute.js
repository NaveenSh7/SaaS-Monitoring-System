const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUser, updateUser,deleteUser } = require('../models/userModel');

// GET all users
router.get('/all', async (req, res) => {

  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

//Add new user
router.post('/' , async (req,res)=>{

     try {
        const { name, email, services = [] } = req.body;
        if (!name || !email) {
          return res.status(400).json({ message: 'Name and email required' });
        }

        const response = await createUser(name,email,services);
        res.json(response);
        
     } catch (err) {
        res.status(200).json({message:'error posting new user'});
        console.log(err,"coudnt save user")
     }

})

// Get a user by query :email
router.get('/' , async (req,res)=>{
  try {
 
    const {email } = req.query;
    const result = await getUser(email);
    res.json(result);

  } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
  }
})

router.put('/' , async (req,res)=>{
  try {
    const {name ,email,services} = req.body;
    const result = await updateUser(name, email, services);
    res.json(result);

  } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
        console.log(error)
  }
})

router.delete('/' , async (req,res)=>{
  try {
    
    const {email } = req.query;
    const result = await deleteUser(email);
    res.json(result);

  } catch (error) {
        res.status(500).json({ message: 'Error delting user' });
  }
})


module.exports = router;