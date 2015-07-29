describe('UserController', function () {

  var $timeout;

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    createScope();
    createController('UserController', this.$scope);
    inject(function (_$timeout_) {
      $timeout = _$timeout_;
    });
  });

  it('should have a user on the scope', function () {
    expect(this.$scope.user).toBeDefined();
  });

  it('should have food for the checkboxes on the scope', function () {
    expect(this.$scope.food).toEqual(['Meat', 'Fish', 'Vegetarian']);
  });

  describe('the submit callback', function () {
    it('should return a failing promise with errors', function () {
      var errors = getMockData('user/errors.json');
      var result = this.$scope.afterSubmit();
      $timeout.flush(2000);

      expect(result).toRejectWith(errors);
    });
  });

});
