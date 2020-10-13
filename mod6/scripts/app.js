(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.intake = '';
  $scope.checkIntake = function() {
    if ($scope.intake.length === 0) {
      $scope.message = "Please enter data first";
    } else {
      var meals = $scope.intake.split(',');
      if (meals.length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    }
  };
};

})();
