(function () {

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject =['UserService', 'MenuService']
function SignupController(UserService, MenuService) {
  var signup = this;
  signup.completed = UserService.registered;
  signup.submit = function () {
    signup.completed = true;
    UserService.setUser(signup.user);
  };

  var promise = MenuService.getMenuItem('L1');
  promise.then(function(response) {
    console.log('good' , response);
  }).catch(function(error) {
    console.log("bad bad bad");
  })
}

})();
