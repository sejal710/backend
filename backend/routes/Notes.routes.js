
const express = require("express");
const {NoteModel} = require("../model/Notes.model")

const noteRouter = express.Router();

noteRouter.get("/",async(req,res) => {
    try{
        const notes = await NoteModel.find();
        res.send(notes)
    }
    catch(err){
        res.send({Message:err.message})
    }
})

noteRouter.post("/create",async(req,res) => {
    const payload = req.body;
    try{
      const note = new NoteModel(payload);
      await note.save();
      res.send({"Message":"NOTE CREATED"})
    }
    catch(err){
        res.send({Message:err.message})
    }
    
})

noteRouter.delete("/delete/:id",async(req,res) => {
    const noteId = req.params.id;
    try{
        await NoteModel.findByIdAndDelete({_id:noteId});
        res.send({Message : `Note with id:${noteId} has been deleted`})
    }
    catch(err){
        res.send({Message:err.message})
    }
})

module.exports = {
    noteRouter
}