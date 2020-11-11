(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('BaseUrl', 'https://davids-restaurant.herokuapp.com');

  // FoundItems.$inject
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItemTemplate.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'menu',
      bindToController: true
    };
    return ddo;
  };

  function FoundItemsDirectiveController() {
    var menu = this;

    menu.empty = function() {
      if ( !menu.items ) {
        return false;
      }
      return !menu.items.length;
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.found;
    // search the menu for the input
    menu.search = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function(response) {
        menu.found = response;
      }).catch(function(error) {})
    };

    // remove the item with the index
    menu.removeItem = function(index) {
      menu.found.splice(index, 1);
    };
  };

  MenuSearchService.$inject = ['BaseUrl', '$http'];

  function MenuSearchService(BaseUrl, $http) {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
      // returns the list of items from the http call
      return $http({
        method: "GET",
        url: (BaseUrl + "/menu_items.json")
      }).then(function(result) {
        var foundItems = [];
        if (!searchTerm) {
          return foundItems;
        }
        for (var item of result.data.menu_items) {
          if (item.description.toLowerCase()
            .includes(searchTerm.toLowerCase())) {
            foundItems.push(item);
          }
        }
        return foundItems;
      });
    };
  };

})();
