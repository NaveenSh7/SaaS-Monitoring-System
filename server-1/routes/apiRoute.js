const express = require('express');
const router = express.Router();
const { getAllApis, createApi, getApi, updateApi } = require('../models/apiModel');
const crypto = require('crypto');

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

router.post("/", async (req, res) => {
  try {
    const { user_id, name, url, api_type, plan } = req.body

   const api_key =  crypto.randomBytes(20)
    .toString('base64')       // Convert to base64
    .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric
    .slice(0, 20);        // Trim to required length - 20
console.log(api_key)

    // Validate required fields
    if (!user_id || !name || !url || !api_type || !plan) {
      return res.status(400).json({
        error: "Missing required fields: user_id, name, url, api_type, plan",
      })
    }
    
    // Validate api_type
    if (!["server", "serverless"].includes(api_type)) {
      return res.status(400).json({
        error: 'api_type must be either "server" or "serverless"',
      })
    }

    // Validate plan
    if (!["free", "pro"].includes(plan)) {
      return res.status(400).json({
        error: 'plan must be either "free" or "pro"',
      })
    }
    
    const newApi = await createApi({
      user_id,
      name,
      url,
      api_type,
      plan,
      api_key
    })
    
    res.status(201).json({
      message: "API created successfully",
      api: newApi,
    })
  } catch (error) {
    console.error("Error creating API:", error)
    res.status(500).json({ error: "Failed to create API" })
  }
})

// router.post('/' , async (req,res)=>{

//      try {
//         const {user_id, name, url} = req.body;

//             if (!user_id || !name || !url) {
//       return res.status(400).json({ message: 'All fields required' });
//     }
//         const response = await createApi(user_id, name, url);
//         res.json(response);
        
//      } catch (err) {
//         res.status(500).json({message:'error posting new api'});
//         console.log(err,"coudnt save api")
//      }

// })

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