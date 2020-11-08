(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('BaseUrl','https://davids-restaurant.herokuapp.com');

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.found;
    menu.search = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function(response){
        console.log(response);
        menu.found = response;
      }).catch(function (error) {
        console.log("Something went wrong.");
      })
    };

  };

  MenuSearchService.$inject = ['BaseUrl','$http'];
  function MenuSearchService(BaseUrl, $http) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      // returns the list of items from the http call
      return $http({
        method: "GET",
        url: (BaseUrl + "/menu_items.json")
      }).then(function (result) {
        var foundItems = [];
        if ( !searchTerm ) {
          return foundItems;
        }
        for (var item of result.data.menu_items) {
          var desc = item.description.toLowerCase();
          if ( desc.includes(searchTerm.toLowerCase()) ) {
            console.log(desc);
            foundItems.push(item);
          }
        }
        return foundItems;
      });
    };
  };

})();
