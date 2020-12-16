describe('MenuService getMenuItem test', function () {

  var menuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return a menuItem', function() {
    var shortName = 'Fake';
    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortName + '.json').respond(['Orange Chicken']);
    menuService.getMenuItem(shortName).then(function(response) {
      expect(response).toEqual(['Orange Chicken']);
    });
    $httpBackend.flush();
  });

});
