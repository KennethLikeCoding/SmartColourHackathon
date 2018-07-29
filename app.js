var express = require("express");
//includes all the content inside express
var app = express();
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));
var colors = {
    yellow: '#ff0',
    green: '#0f0',
    red: '#f00',
    blue: '#00f',
    gray: '#888',
    maroon: '#800',
    olive: '#880',
    cyan: '#0ff',
    teal: '#088',
    navy: '#008',
    fuchsia: '#f0f',
    orange: '#f80',
    brown: '#844',
    purple: '#808',
    plum: '#804'
  };
  
var nearestColor = require('nearest-color').from(colors);

app.get("/colorpicker", function(req, res) {
    res.render("colorpicker.html");
})

app.get("/nearestColor/:id", function(req, res) {
    
    var match = nearestColor('#' + req.params.id);
    console.log(match);
    var data = match.value.substring(1);
    res.header("Content-Type",'application/json');
    res.header("Access-Control-Allow-Origin",'*');
    res.send(JSON.stringify(data));
});

app.get("/", function(req, res) {
    res.render("index.html");
})

app.get("/chromkey", function(req, res) {
    res.render("chroma-key-demo.html");
})

app.listen(6789, 'localhost', function(){
    console.log("The server has started");
});