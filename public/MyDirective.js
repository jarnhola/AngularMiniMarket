var module = angular.module('myModule',['ngResource']);

//direktiivi example
module.directive('myDirective',function(){

    //palautetaan directive objekti, jolla on seuraavia ominaisuuksia:
    return {
        restrict:'AEC', //A=atribuutti, E=elementti, C=luokka
        scope:{
            temp:'@',
            city:'@'
        },
        templateUrl:'myDirective.html',
        controller:'DirectiveController'
    }; 
});

module.controller('DirectiveController',function($scope,$resource){
    
    var data = $resource('http://api.openweathermap.org/data/2.5/weather?q="Oulu,fi"').get(function(){

        console.log(data.main.temp);
        $scope.temp = data.main.temp;
        $scope.city = data.name;
    });
});