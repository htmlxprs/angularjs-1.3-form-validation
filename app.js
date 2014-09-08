angular.module('htmlxprs',['ngMessages']).controller('DemoController', ['$scope',function($scope) {
  
}]).service('usernameService',['$http','$q','$timeout',function($http,$q,$timeout){
  this.checkAvailability=function(username){
    //Simulating async call to check availability. Always reject here.
    var deferred=$q.defer();
    $timeout(function(){
      deferred.reject('Not Available');
    },2000);
    
    return deferred.promise;
    
  }
}]).directive('usernameValidator',['usernameService',function(usernameService){
  return {
    restrict:'AE',
    require:'ngModel',
    link:function($scope,elem,attrs,ngModel){
      ngModel.$validators.username=function(modelValue,viewValue){
        var value=modelValue || viewValue;
        return /^[a-zA-Z0-9]+$/.test(value);
      }
      
      ngModel.$asyncValidators.usernameAvailability=function(modelValue,viewValue){
        var value=modelValue || viewValue;
        return usernameService.checkAvailability(value);
      }
      
    }
  }
}]);
