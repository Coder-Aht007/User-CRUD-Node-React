var express = require("express");
var cors = require("cors");

const userRouters=require("./routes/users");

require('dotenv').config();

const app=express();
const port=process.env.PORT||4000;

app.use(cors());

app.use(express.json());
app.use('/users',userRouters);

app.listen(port,()=>{console.log("Listening on port "+port)});