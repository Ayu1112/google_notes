const jwt=require('jsonwebtoken');
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(token){
 try {
    const decoded=jwt.verify(token,process.env.secretkey)
    if(decoded){
     req.body.userId=decoded.userId;
     req.body.user=decoded.user;
        next()
    }else{
        res.json({msg:"Not Authorized to access  or LOGIN AGAIN"})
    }
 } catch (err) {
    res.json({error:err.message})
 }
    }else{
        res.json({msg:"PLEASE LOGIN FIRST"})
    }
}

module.exports={
    auth
}