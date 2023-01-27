const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { setUncaughtExceptionCaptureCallback } = require("process");
const app = express();
let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    let today = new Date();
    let Currentday = today.getDay();
    
    let options = {weekday :"long",day: "numeric",month :"long"};
    let day = today.toLocaleDateString("en-US",options);

        res.render("List",{kindofDay: day , newItems: items});
    });

app.post("/",function(req,res){
    let item = req.body.newItem;
    
    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work",function(req,res){
    res.render("List",{kindofDay: "Work List",newItems: workItems})
});

app.post("/work",function(req,res){
    let item =req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",function(req,res){
    res.render("about");
}
);
app.listen(3000,function(){
    console.log("server started at port 3000");
});
