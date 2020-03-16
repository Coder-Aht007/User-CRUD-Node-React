const express= require('express');
const cors= require('cors');
const mongoose=require('mongoose');

require('dotenv').config();
const exercisesRouters=require("./routes/exercises");
const userRouters=require("./routes/users");

const app=express();
const port=process.env.PORT||4000;

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.json());
app.use('/exercises',exercisesRouters);
app.use('/users',userRouters);

const uri=process.env.ATLAS_URI;
mongoose.connect(uri,
    {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}
    );
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("Connection Establised Successfully");
});

console.log(port);
app.listen(port,()=>{
    console.log('Server Running');
});
