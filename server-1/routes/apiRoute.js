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

router.post("/", async (req, res) => {
  try {
    const { user_id, name, url, api_type, plan, sdk_code } = req.body

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

    // For pro plan, sdk_code should be provided
    if (plan === "pro" && !sdk_code) {
      return res.status(400).json({
        error: "sdk_code is required for pro plan",
      })
    }

    
    
    const newApi = await createApi({
      user_id,
      name,
      url,
      api_type,
      plan,
      sdk_code: plan === "pro" ? sdk_code : null,
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