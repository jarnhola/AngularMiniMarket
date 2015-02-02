var mainMod = angular.module('MiniMarket',['ngRoute','myModule','ngResource']);

//main configuration
mainMod.config(function($routeProvider, $locationProvider){
    
    //this removes the hashtag # problem
    $locationProvider.html5Mode(true); 
    
    $routeProvider.when('/',{
        controller:'productController',
        templateUrl:'views/products.html'
    });
    
    $routeProvider.when('/add',{
        controller:'UserProduct',
        templateUrl:'views/userproducts.html'
    });
});

//------------------------------------------------------------------------------------------------
// Product Controller
//------------------------------------------------------------------------------------------------

//Thisis one syntax to create a controller, but might get broken is this is minified
mainMod.controller('productController', function($scope,$location,productFactory,$route){ //use the 'productFactory in this controller

    //That's the 'next' function called from 'products.html'
    $scope.next = function(){
        $location.path('/add');
    }
    
    $scope.deleteProduct = function(index){
        console.log(index);

        productFactory.deleteItem(index).then(function(data){
            $scope.products.splice(index,1);
            //$route.reload();
        });
    }
    
    $scope.updateProduct = function(index){
        console.log(index);

        productFactory.updateItem(index).then(function(data){
            $scope.products.splice(index,1);
            //$route.reload();
        });
    }    
    
    //wait here that we get response from server
    productFactory.getProducts().then(function(data){
        $scope.products = data;
    });


});

//------------------------------------------------------------------------------------------------
// Userproduct Controller
//------------------------------------------------------------------------------------------------
// This is another syntax for creating controller (or facory/service)
// The minifier wont brake the code if you use this syntax
//------------------------------------------------------------------------------------------------

mainMod.controller('UserProduct',['$scope','productFactory','$location',function($scope,productFactory,$location){
    
    // Deine your scope atributes always in object literal
    // See more: https://github.com/angular/angular.js/wiki/Understanding-Scopes
    $scope.product = {
        name:'',
        price:'',
        post_product:function(){
            
            var promise = productFactory.postProduct($scope.product);
            promise.then(function(data){
                console.log(data);
            });
        },
        return:function(){         //That's the 'return' function called from 'userproducts.html'
            $location.path('/');
        }
            
    }
}]);

//------------------------------------------------------------------------------------------------
// Product Factory
//------------------------------------------------------------------------------------------------

mainMod.factory('productFactory', function($http,$q,$resource){
    //use $http service in this factory / use also $q -service https://docs.angularjs.org/api/ng/service/$q
    
    var factory = {};

//-------------------------------------------- GET ---------------------------------------------- 
    
    factory.getProducts = function(scope){
    
        var deferred = $q.defer();
        factory.promise = deferred.promise;
        
        $http.get('/data').
            success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error loading data');
            });
        
        return deferred.promise;
    }

//-------------------------------------------- POST ---------------------------------------------    
    
    factory.postProduct = function(data){
        
        return $resource('/data',{},{'post':{method:'POST'}}).post(data).$promise;
        
        //var req = $resource('/data',{},{'post':{method:'POST'}})
        //return req.post(data).$promise;
            
    }

//------------------------------------------- DELETE -------------------------------------------- 
    
    factory.deleteItem = function(index){
        var req = $resource('/data/',{id:index},{'delete':{method:'DELETE'}});
        
        return req.delete().$promise;
    }
    
    return factory;
});
