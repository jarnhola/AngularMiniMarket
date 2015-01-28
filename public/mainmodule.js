var mainMod = angular.module('MiniMarket',['ngRoute','myModule']);

//main configuration
mainMod.config(function($routeProvider, $locationProvider){
    
    //this removes the hashtag # poblem
    $locationProvider.html5Mode(true); 
    
    $routeProvider.when('/',{
        controller:'productController',
        templateUrl:'products.html'
    });
    
    $routeProvider.when('/add',{
        templateUrl:'userproducts.html'
    });
});

mainMod.controller('productController', function($scope, productFactory){ //use the 'productFactory in this controller

    //$scope.products = productFactory.getProducts(); // use factory that gets products
    //$scope.products = productFactory.getProducts($scope);
    
    //productFactory.getProducts();

    $scope.jotain = "Jarno";
    
    //wait here that we get response from server
    productFactory.getProducts().then(function(data){
        $scope.products = data;
    });
    
});

mainMod.factory('productFactory', function($http,$q){  
    //use $http service in this factory / use also $q -service https://docs.angularjs.org/api/ng/service/$q
    
    var factory = {};
    
    factory.getProducts = function(scope){
    
        var deferred = $q.defer();
        factory.promise = deferred.promise;
        
        $http.get('/data').
            success(function(data, status, headers, config) {
                //console.log(data);
                //return(data;
                //scope.products = data;
            
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error loading data');
            });
        
        return deferred.promise;
    }
    
    return factory;
});
