//console.log("test")

var calcApp = angular.module('calcApp',[]);

calcApp.factory('multiplyFactory',['$http','$q',function($http,$q){

return{
getData : function(){
    var deferred = $q.defer();
         $http({
            method: 'GET',
            url: '/getData'
          }).then(function(res){
             
              return deferred.resolve(res.data);
          },function(err){
              return deferred.reject(res.err);
          });
          return deferred.promise;
    },
    saveData : function(formdata){
        var deferred = $q.defer();
         $http({
            method:'POST',
            url: '/saveData',
            data : formdata
        }).then(function(res){ 
            return deferred.resolve(res.data);
        },function(err){
            return deferred.reject(res.err);
            
        })
        return deferred.promise;
    }
  
}
}]);

calcApp.controller('multiplyController',['$scope','multiplyFactory',function($scope,multiplyFactory){
$scope.message = '';


$scope.fetchData = function(){
var result = multiplyFactory.getData();
result.then(function(res){
    $scope.num1= res.num1;
    $scope.num2 = res.num2;
    $scope.multiply = res.multiply;
})
};
$scope.fetchData();

$scope.saveData = function(data){
    multiplyFactory.saveData(data).then(()=>{
    $scope.message = 'Saved Successfully';
  //  $scope.fetchData();
},()=>{
    $scope.message = 'Failed to save';
})
}
}]);

calcApp.directive('multiply',function(){
  
    return {
        restrict:'A',
        link: function(scope,element,attrs){
           
            element.on('click',function(){
                    scope.multiply = scope.num1 * scope.num2
                    scope.saveData({num1:scope.num1,num2:scope.num2,multiply:scope.multiply});
                })
        }


    }
});

