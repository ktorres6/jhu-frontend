(function() {

  angular.module('public')
    .controller('MyinfoController', MyinfoController);

  MyinfoController.$inject = ['UserService']

  function MyinfoController(UserService) {
    var myinfo = this;
    myinfo.ready = UserService.registered;
    if (myinfo.ready) {
      myinfo.user = UserService.getUser();
    }
  }

})();
