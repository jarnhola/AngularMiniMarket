var express = require('express');

var router = express.Router();

//Following are REST app methods/routes

router.get('/',function(req,res){
    var dummy=[{name:'Maito',price:'1,05 €'},
               {name:'Coffee',price:'4,95 €'}];
    
    res.send(dummy);
});

router.post('/',function(req,res){
    
});

router.put('/',function(req,res){
    
});

router.delete('/',function(req,res){
    
});

module.exports = router;