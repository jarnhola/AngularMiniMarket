var express = require('express');

var router = express.Router();

//Following are REST app methods/routes

var dummy=[];

router.get('/',function(req,res){

    res.send(dummy);
});

router.post('/',function(req,res){
    
    dummy.push(req.body);
    res.send('Added to server array');
});

router.put('/',function(req,res){
    
});

router.delete('/',function(req,res){
    
    dummy.splice(req.query.id,1);
    res.send("We are ok!");
});

module.exports = router;