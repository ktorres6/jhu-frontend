(function() {

  angular.module('public')
    .controller('MyinfoController', MyinfoController);

  MyinfoController.$inject = ['UserService','ApiPath']

  function MyinfoController(UserService, ApiPath) {
    var myinfo = this;
    myinfo.basePath = ApiPath;
    myinfo.ready = UserService.registered;
    if (myinfo.ready) {
      myinfo.user = UserService.getUser();
      myinfo.fav = UserService.fav;
    }
  }

})();
