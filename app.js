var express = require('express');
var path = require('path');
var user = require('./user.js');

var app = express();

//this function is executed for every request = tähän tulee kaikki pyynnöt!
app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.path);
    next();
});

//Middleware for user data
app.use('/data',user);

//Use static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);