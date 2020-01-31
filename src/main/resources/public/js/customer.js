var app1 = angular.module('customersDemo', []);
app1.controller('customersCtrl', function($scope, $http) {
    $scope.customers = [];

  $http.get('http://localhost:8484/customer/').success(function(data){
    $scope.customers = data;
  });
});