var mainMod = angular.module('MiniMarket',['ngRoute']);

mainMod.config(function($routeProvider){
    $routeProvider.when('/',{
        //controller:'productController',
        templateUrl:'products.html'
    })
});

/*mainMod.controller('productController', function($scope, productFactory){

    $scope.cars = carFactory.getCars();
    
    $scope.addCar = function(){
        carFactory.addNewCar({model:$scope.carModel, price:$scope.carPrice});
    };
    
});*/