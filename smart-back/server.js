const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello node api')
})



mongoose.connect('mongodb+srv://smartsystemall623:fTa4zCVgCnxi4gJM@smartsystemapi.4ylwyo9.mongodb.net/Smart-API?retryWrites=true&w=majority&appName=SmartsystemAPI')
.then(()=>{
    app.listen(3000,()=>{
        console.log('Node api is running on port 3000')
    })
    console.log('Connected to Mongodb')
}).catch((error)=>{
    console.log(error)
})