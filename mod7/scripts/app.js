(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  // To buy controller
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    // get the list of items to buy
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    // buy the item
    toBuy.buyItem = function ( itemIndex ) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
    // check if the list is empty
    toBuy.empty = function () {
      return toBuy.items === undefined || toBuy.items.length == 0;
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  // Already bought controller
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    // get the list of items already bought
    bought.items = ShoppingListCheckOffService.getBoughtItems();
    // check if the list is empty
    bought.empty = function () {
      return bought.items === undefined || bought.items.length == 0;
    }
  }

  // Singleton Service
  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyItems = initializeList();
    var boughtItems = [];

    // Initialize the list of items to buy
    function initializeList() {
      var item1 = {
        name: "milk",
        quantity: 1
      };
      var item2 = {
        name: "cookies",
        quantity: 10
      };
      var item3 = {
        name: "bread",
        quantity: 1
      };
      var item4 = {
        name: "chicken",
        quantity: 4
      };
      var item5 = {
        name: "ice cream",
        quantity: 2
      };
      return [item1, item2, item3, item4, item5];
    };

    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };

    service.buyItem = function(itemIndex) {
      var item = toBuyItems.splice(itemIndex,1);
      boughtItems.push(item[0]);
    };
  }

})();
