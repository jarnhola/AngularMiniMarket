var express = require('express');
var path = require('path');
var user = require('./user.js');
var bodyParser = require('body-parser');

var app = express();

//Use bodyparser middleware
app.use(bodyParser.json());

//this function is executed for every request = tähän tulee kaikki pyynnöt!
app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.path);
    next();
});

//Middleware for user data
app.use('/data',user);

//Use static files from public folder
app.use(express.static(path.join(__dirname, '/')));
app.use("/add",express.static(path.join(__dirname, 'public'))); //tällä puukotuksella saadaan refresh toimimaan...

app.listen(3000);