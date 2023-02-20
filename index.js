
const express = require('express');
const cors = require("cors")
const app = express();
const {connection} = require("./db");
const {userRouter} = require("./routes/User.routes")
const {noteRouter} = require("./routes/Notes.routes")
require("dotenv").config()
const {authetication} = require("./middleware/authenticate.middleware")

app.use(express.json());
app.use(cors())
app.get("/",(req,res) => {
    res.send("Home Page")
})

app.use("/user",userRouter);
app.use(authetication);
app.use("/notes",noteRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log(`Server is runing in port ${process.env.PORT}`);
        console.log("Connect to DB");
    }
    catch{
        console.log("Error Message",err.message);
    }
})