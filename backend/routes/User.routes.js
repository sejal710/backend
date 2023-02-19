
const express = require("express");
const {UserModel} = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userRouter = express.Router();

userRouter.post("/register",async(req,res) => {
    const {name,email,pass} = req.body;
    try{
        bcrypt.hash(pass, 5, async(err,hash) => {
            if(err) res.send({"Message":"Something Went Wrong","Error":err.message});
            else{
                const user = new UserModel({name,email,pass:hash});
                await user.save();
                res.send({"Message":"Registerd Sucessfully"});
            }
        })
    }
    catch(err){
        res.send({"Message":"Something Went Wrong","Error":err.message})
    }
})

userRouter.post("/login",async(req,res) => {
    const {email,pass} = req.body;
    try{
        const user=await UserModel.find({email});
        if(user.length > 0){

            bcrypt.compare(pass, user[0].pass, function(err, result) {
             if(result){
             const token = jwt.sign({ userID:user[0]._id}, 'masai');

            res.send({"msg":"Login Successfull","token":token})
            } else {res.send("Wrong Credntials")}
            });
        }
        else{
            res.send({"Message":"Wrong Credential"})
        }

    }

    catch(err){
        res.send({"Message":"Something Went Wrong","Error":err.message});
    }

})

module.exports = {
    userRouter
}
