const express = require('express')
const app = express();
const ejsMate = require('ejs-mate')
const path = require('path')
// const ejslayout = require('express-ejs-layouts')

// Middleware and dependencies here please
// app.use(ejslayout)

// middleware telling the engine to use the ejs as ejsMate
 

// Middlewares here please  
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(3000,()=>{
    console.log("Serving on port 3000")
})

