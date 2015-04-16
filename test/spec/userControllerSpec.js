describe('UserController', function () {

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .setupResults(function () {
        return {
        }
      })
      .run();

    createScope();
    createController('UserController', this.$scope);

  });

  it('should have a user on the scope', function () {
    expect(this.$scope.user).toBeDefined();
  });

});