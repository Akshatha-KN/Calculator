
describe('Test Contoller', function() {

  
  beforeEach(module('calcApp'));



  
  describe('Get Data',function(){ //describe your app name<br />

    var $q;
        var multiplyFactory;
       
        var multiplyCntrl;
        var $scope;
        var $controller;
        var deferred;
        beforeEach(inject(function(_$q_, _multiplyFactory_,$injector,_$controller_){ //Mock our factory and spy on methods
        multiplyFactory = $injector.get('multiplyFactory');
        $q = _$q_;
        $scope = $injector.get('$rootScope').$new();

        deferred = _$q_.defer();

        spyOn(multiplyFactory, 'getData').and.returnValue(deferred.promise);

      $controller = _$controller_;
      multiplyCntrl =  $controller('multiplyController', {
        //inject factory
        $scope : $scope,
        multiplyFactory : multiplyFactory,
    });
          
        }));
   
  

    it('should set first number to 2 and second number to 3 and their multiplied value to 6', function(){  //write tests
   
    deferred.resolve({num1:2,num2:3,multiply:6});
      $scope.$apply()
    
      expect($scope.num1).toBe(2);
      expect($scope.num2).toBe(3);
      expect($scope.multiply).toBe(6);
   
    });

   

  });
});