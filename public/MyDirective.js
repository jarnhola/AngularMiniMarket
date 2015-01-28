var module = angular.module('myModule',['ngResource']);

//direktiivi example
module.directive('myDirective',function(){

    //palautetaan directive objekti, jolla on seuraavia ominaisuuksia:
    return {
        restrict:'AEC', //A=atribuutti, E=elementti, C=luokka
        scope:{
            temp:'@',
            city:'@',
            location:'@'
        },
        templateUrl:'myDirective.html',
        controller:'DirectiveController'
    }; 
});

module.controller('DirectiveController',function($scope,$resource){
    
    var data = $resource('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.location).get(function(){
        //console.log({{location}});
        console.log(data.main.temp);
        $scope.temp = parseFloat(data.main.temp - 273.15).toFixed(2);
        $scope.city = data.name;
    });
});