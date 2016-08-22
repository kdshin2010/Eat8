(function (app) {
  'use strict';
  
  app.controller('SimpleArrayCtrl', ['$scope', function SimpleArrayCtrl($scope) {
    // fruits
    $scope.fruits = ['apple', 'orange', 'pear', 'naartjie'];
    
    // selected fruits
    $scope.selection = ['apple', 'pear'];
    
    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(fruitName) {
      var idx = $scope.selection.indexOf(fruitName);
      
      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }
      
      // is newly selected
      else {
        $scope.selection.push(fruitName);
      }
    };
  }]);
  
  app.controller('ObjectArrayCtrl', ['$scope', 'filterFilter', function ObjectArrayCtrl($scope, filterFilter) {
    // fruits
    $scope.fruits = [
      { name: 'apple',    selected: true },
      { name: 'orange',   selected: false },
      { name: 'pear',     selected: true },
      { name: 'naartjie', selected: false }
    ];
    
    // selected fruits
    $scope.selection = [];
    
    // helper method
    $scope.selectedFruits = function selectedFruits() {
      return filterFilter($scope.fruits, { selected: true });
    };
    
    // watch fruits for changes
    $scope.$watch('fruits|filter:{selected:true}', function (nv) {
      $scope.selection = nv.map(function (fruit) {
        return fruit.name;
      });
    }, true);
  }]);
  
  /**
   * custom filter
   */
  app.filter('fruitSelection', ['filterFilter', function (filterFilter) {
    return function fruitSelection(input, prop) {
      return filterFilter(input, { selected: true }).map(function (fruit) {
        return fruit[prop];
      });
    };
  }]);
})(angular.module('app', []));