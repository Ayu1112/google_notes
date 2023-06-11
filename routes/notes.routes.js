const express = require('express');
const {auth}  = require('../middlewares/auth.middleware');
const {noteModel} =require('../models/note.model');
const noteRouter=express.Router();
noteRouter.use(auth)

noteRouter.post("/create",async(req,res)=>{
try {
    const note=new noteModel(req.body)
    await note.save();
    res.json({msg:"New note created",note:req.body})
} catch (err) {
    res.json({msg:"Error while creating note",error:err.message})
}
})



noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await noteModel.find({userId:req.body.userId})
     
        res.send(notes)
    } catch (err) {
        res.json({msg:"Error while creating note",error:err.message})
    }
})


noteRouter.patch("/update/:noteID",async(req,res)=>{
    const userIDinUserDoc=req.body.userId;
    console.log(userIDinUserDoc)
const {noteID} = req.params
console.log(req.params)
   try {
    const note= await noteModel.findOne({_id:noteID})
    console.log(note,"swdw")
    const userIDinNoteDoc=note.userId;
    console.log(userIDinNoteDoc)
    if(userIDinUserDoc === userIDinNoteDoc){
        //update  
        await noteModel.findByIdAndUpdate({_id:noteID},req.body)
       res.json({msg:`${note.title} has been updated`})
    }else{
        res.json({msg:"Not Authorized!!"})
    }
   } catch (err) {
    res.json({error:err})
   }
})

noteRouter.delete("/delete/:noteID", async(req,res)=>{
    const userIDinUserDoc=req.body.userId;
    console.log(userIDinUserDoc)
const {noteID} = req.params
console.log(req.params)
   try {
    const note= await noteModel.findOne({_id:noteID})
    console.log(note,"swdw")
    const userIDinNoteDoc=note.userId;
    console.log(userIDinNoteDoc)
    if(userIDinUserDoc === userIDinNoteDoc){
        //update  
        await noteModel.findByIdAndDelete({_id:noteID},req.body)
       res.json({msg:`${note.title} has been Deleted`})
    }else{
        res.json({msg:"Not Authorized!!"})
    }
   } catch (err) {
    res.json({error:err})
   }
})

module.exports ={
    noteRouter
}