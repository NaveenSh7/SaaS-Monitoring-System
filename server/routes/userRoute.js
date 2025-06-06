const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../models/userModel');

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
        const {name,email,services} = req.body;

            if (!name || !email || !services) {
      return res.status(400).json({ message: 'All fields required' });
    }
        const response = await createUser(name,email,services);
        res.json(response);
        
     } catch (err) {
        res.status(200).json({message:'error posting new user'});
        console.log(err,"coudnt save user")
     }

})


module.exports = router;