const express =require("express");
const cors= require("cors");
const app =new express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use("/api/",require("./routers/api/todo"));

app.listen(PORT,function(err){
    if(!err){
        console.log(`SERVER LISTENING : PORT ${PORT}`);
    }else{
        console.log("SERVER ERROR : LISTENING FAILED");
    }
})