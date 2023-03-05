const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(express.urlencoded());

var items = [];
var workItems = [];

app.get("/", function(req, res){
    let day = date.toDate();

    res.render("list", {listTitle: day,  listElement : items});

   
});

app.post("/", (req, res) =>{
    if(req.body.Button === "Work") {
        let workItem = req.body.listElement;
        workItems.push(workItem);
        res.redirect("/work");
    } else {
        var item = req.body.listElement;
        items.push(item);
        res.redirect("/");
    }
   
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", listElement: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});