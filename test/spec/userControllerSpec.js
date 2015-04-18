describe('UserController', function () {

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    createScope();
    createController('UserController', this.$scope);
  });

  it('should have a user on the scope', function () {
    expect(this.$scope.user).toBeDefined();
  });

  describe('the submit callback', function () {
    it('should return a failing promise with errors', function () {
      var errors = getMockData('user/errors.json');
      expect(this.$scope.afterSubmit()).toRejectWith(errors);
    });
  });

});
