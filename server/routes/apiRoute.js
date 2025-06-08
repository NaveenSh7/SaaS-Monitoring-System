const express = require('express');
const router = express.Router();
const { getAllApis, createApi, getApi, updateApi } = require('../models/apiModel');

// GET all apis
router.get('/all', async (req, res) => {

  try {
    const users = await getAllApis();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching apis' });
  }
});

//Add new api
router.post('/' , async (req,res)=>{

     try {
        const {user_id, name, url} = req.body;

            if (!user_id || !name || !url) {
      return res.status(400).json({ message: 'All fields required' });
    }
        const response = await createApi(user_id, name, url);
        res.json(response);
        
     } catch (err) {
        res.status(500).json({message:'error posting new api'});
        console.log(err,"coudnt save api")
     }

})

// Get a api by query :user_id
router.get('/' , async (req,res)=>{
  try {
 
    const {user_id } = req.query;
    const result = await getApi(user_id);
    res.json(result);

  } catch (error) {
        res.status(500).json({ message: 'Error fetching api' });
  }
})

router.put('/' , async (req,res)=>{
  try {
    const {api_id, name, url} = req.body;
    const result = await updateApi(api_id, name, url);
    res.json(result);

  } catch (error) {
        res.status(500).json({ message: 'Error updating api' });
        console.log(error)
  }
})



module.exports = router;