const express = require('express');
const router = express.Router();



//Add log-data
router.post('/logs' , async (req,res)=>{
      console.log("agaya mei")
     try {
          const data = req.body;
          const apiSecret = req.headers['api-secret'];

  console.log("Secret Header:", req.headers);
    
        console.log("body data", data);
      
        res.send(data);
        
     } catch (err) {
        // res.status(200).json({message:'error posting new user'});
        // console.log(err,"coudnt save user")
        console.log(err)
     }

})

module.exports = router;