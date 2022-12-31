const express = require('express');
const bodyParser = require('body-parser');
const app = express();  
app.use(bodyParser.urlencoded({extended: true}));
//app.get("/", function(req, res){
    //res.sendFile(__dirname)
//})
app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html")
})
app.post("/", function(req, res){
    var number1 = Number(req.body.num1);
var number2 = Number(req.body.num2);
var answer = number1 + number2;
res.send("answer for you calculation is in addition is " + answer);

})
app.get("/subtraction", function(req, res){
    res.sendFile(__dirname +"/index.html")
})
app.post("/subtraction", function(req, res){
    var number1 = Number(req.body.num1);
var number2 = Number(req.body.num2);
var answer = number1 - number2;
res.send("answer for you calculation is in subtraction is " + answer);

})
app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmical.html");
})
app.post("/bmicalculator", function(req, res){
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var answer1 = height * height;
    var finalanswer = weight / answer1;
  var roundoffa = Math.floor(finalanswer)
  if (roundoffa > 25){
    res.send("your body mass index or BMI is  " + roundoffa + " . your body mass index is too high")
  }else if (roundoffa < 19) {
    res.send("your body mass index or BMI is " + roundoffa + " . your body mass index is very low")
  } else {
    res.send("your body mass index or BMI is " + roundoffa + " . you are ok")
  }
    res.send("your body mass index or BMI is " + roundoffa)
})
app.listen(4000, function(){
    console.log("the server is running on 4000");
})