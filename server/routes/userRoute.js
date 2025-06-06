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

router.post('/' , async (req,res)=>{

     try {
        const {name,email,password} = req.body;

            if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }
        const response = await createUser(name,email,password);
        res.json(response);
        
     } catch (err) {
        res.status(200).json({message:'error posting new user'});
        console.log(err,"coudnt save user")
     }

})


module.exports = router;