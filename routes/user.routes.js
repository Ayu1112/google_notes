const express= require('express');
const userRouter = express.Router();
const {userModel} = require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
require("dotenv").config()

///register
userRouter.post('/register', async(req,res)=>{
const {name,email,pass}=req.body;

try {
    bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            res.json({error:err.message})
        }else{
            const user=new userModel({name,email,pass:hash})
            await user.save()
           res.json({msg:"User registered successfully",user:req.body})
         }
    })

} catch (err) {
    res.json({error:err.message})
}
})

////////LOGIN   //
userRouter.post('/login', async(req,res)=>{
    //logic
    const {email,pass}=req.body;

    try {
        const user=await userModel.findOne({email})
        if(user){
bcrypt.compare(pass,user.pass,(err,result)=>{
    if(result){
        let token=jwt.sign({userId:user._id,user:user.name},process.env.secretkey)
        res.json({msg:"Login Success",token})
    }else{
        res.json({msg:"Login Failure//Wrong credantials"})
    }
})
        }else{
            res.json({msg:"user not found"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
})

module.exports ={
    userRouter
}