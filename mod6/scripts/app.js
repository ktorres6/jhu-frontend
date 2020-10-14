(function() {
  'use strict';

  angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    // the input
    $scope.intake = '';
    // style object
    $scope.styleProp = {};

    // Check the meal intake input
    $scope.checkIntake = function() {
      // actual non-empty count
      var actual = getNonEmpty($scope.intake);
      // the style color
      var color = 'green';
      if (actual === 0) {
        $scope.message = "Please enter data first";
        color = 'red';
      } else if (actual <= 3) {
        $scope.message = "Enjoy!";

      } else {
        $scope.message = "Too much!";
      }
      $scope.styleProp.msg = {
        'color': color
      };
      $scope.styleProp.box = {
        'border': '1px solid ' + color
      };
    }
  };

  // Count the non-empty tokens
  function getNonEmpty(lunch) {
    if (lunch.length === 0) {
      return 0;
    } else {
      var count = 0;
      var meals = lunch.split(',');
      for (var i = 0; i < meals.length; i++) {
        if (meals[i].trim().length > 0) {
          count++;
        }
      }
      return count;
    };
  };

})();
