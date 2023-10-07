const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.urlencoded({extended: false}));


app.get("/login",(req,res,next)=>{

   res.send(`<form onsubmit='localStorage.setItem("username",document.getElementById("username").value) 'action='/data' method='POST'><input type='text' name='username' id='username'><button type='submit'>SUBMIT</button></form>`)
})

app.post("/data",(req,res,next)=>{
    console.log(req.body)
    
    res.redirect("/")
})

app.get("/",(req,res,next)=>{
    fs.readFile("username.txt",(err,data)=>{
        if(err)
        {
            console.log(err)
            data = "No Chats Exists"
        }
        res.send(`
    <h1>${data}</h1>
    <form action ="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
    <input type ="text" name = "message" id="message">
    <input type="hidden" name="username" id="username">
    <br>
    <button type="submit">Send</button>
    </form>
    `)
    });
    
})
app.post("/",(req,res,next)=>{
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile("username.txt",`${req.body.username} : ${req.body.message} ,`,{flag:"a"},(err)=>
    err ? console.log(err) : res.redirect("/"))
    
})

app.listen(3000);