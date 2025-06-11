const express = require('express');
const router = express.Router();
const {createUptime ,updateUptime,getUptime } = require('../models/uptimeModel');



//Add new uptime
router.post('/' , async (req,res)=>{
     try {
        const {api_id,status,started_at,ended_at,latency} = req.body;

            if (!api_id || !status || !started_at) {
      return res.status(400).json({ message: 'All fields required' });
    }
        const response = await createUptime(api_id,status,started_at,ended_at,latency);
        res.json(response);
        
     } catch (err) {
        res.status(500).json({message:'error posting new uptime'});
        console.log(err,"coudnt save uptime")
     }
})

// changing status and adding new uptime/downtime

router.put('/' , async (req,res)=>{
  try {
    const {api_id,status,latency} = req.body;
    const uptimes = await getUptime(api_id);
    const ongoing = uptimes.find(row => row.ended_at === null);



    const id = ongoing.id;
  
    if(status !== ongoing.status)
    {
        const result1 = await updateUptime(id);
        const result2 = await createUptime(api_id ,status,latency);

         res.json(result2);
    }
    else{
 res.json("kcuh change nhi karna ");
    }

  } catch (error) {
      //   res.status(500).json({ message: 'Error updating uptime' });
       
  }
})


module.exports = router;