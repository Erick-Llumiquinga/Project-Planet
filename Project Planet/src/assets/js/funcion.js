(function (){

    var app = angular.module('starter', ['ionic'])  
    
    app.controller('controller', function($scope, $http) {
    
        $scope.registrar = function(){
        $http.post("http://192.168.1.2:8100",{
    
        }).success(function(data){
           console.log("exito"); 
        });
    }
    });
    
    app.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
    }())