(function () {

angular.module('public')
.controller('SignupController', SignupController);


SignupController.$inject =['UserService', 'MenuService']
function SignupController(UserService, MenuService) {
  var signup = this;
  signup.completed = UserService.registered;
  signup.error = false;

  signup.testMenu = function () {
    // check for the menu number
    if ( signup.user.menuNum ) {
      var promise = MenuService.getMenuItem(signup.user.menuNum);
      promise.then(function(response) {
        UserService.setFavorite(response);
        signup.error = false;
      }).catch(function(error) {
        signup.error = true;
      })
    } else {
      UserService.setFavorite('');
    }
  }

  signup.submit = function () {
    signup.completed = true;
    UserService.setUser(signup.user);
  };
}

})();
