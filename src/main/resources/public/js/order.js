var app = angular.module('ordersDemo', []);
app.controller('ordersCtrl', function($scope, $http) {
    $scope.orders = [];

  $http.get('http://localhost:8484/order/').success(function(data){
    $scope.orders = data;
  });
});