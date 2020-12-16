(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

function UserService() {
  var service = this;
  service.registered = false;
  service.setUser = function (user) {
    console.log("setting user name = " + user.fname);
    service.user = user;
    service.registered = true;
  }

  service.getUser = function () {
    return service.user;
  }
}



})();
