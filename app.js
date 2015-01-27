var express = require('express');
var path = require('path');

var app = express();

//this function is executed for every request
app.use(function(req,res,next){
    console.log(req.method);
    next();
});

//Use static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);