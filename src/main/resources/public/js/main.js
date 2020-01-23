var app = angular.module('ordersDemo', []);
app.controller('ordersCtrl', function($scope, $http) {
    $scope.orders = [];

  $http.get('http://localhost:8484/orders').success(function(data){
    $scope.orders = data;
  });
});