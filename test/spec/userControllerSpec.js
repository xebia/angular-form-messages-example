describe('UserController', function () {

  var $timeout;

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    createScope();
    createController('UserController');
    $timeout = mox.inject('$timeout');
  });

  it('should have a users for both forms on the scope', function () {
    expect(this.$scope.user).toBeDefined();
    expect(this.$scope.complexUser).toBeDefined();
  });

  it('should have food for the checkboxes on the scope', function () {
    expect(this.$scope.food).toEqual(['Meat', 'Fish', 'Vegetarian']);
  });

  it('should have one (non-defined) friend on the scope', function () {
    expect(this.$scope.complexUser.friends).toEqual([{}, {}]);
  });

  describe('the newFriend method', function () {
    it('should add a new object to the friends array', function () {
      this.$scope.newFriend();
      expect(this.$scope.complexUser.friends).toEqual([{}, {}, {}]);
    });
  });

  describe('the submit callback for the simple form', function () {
    it('should return a failing promise with errors', function () {
      var result = this.$scope.afterSubmit();
      $timeout.flush(2000);

      expect(result).toRejectWith({
        validation: {
          userForm: _.pick(getMockData('user/errors.json').validation.complexUserForm, '$messages', 'user.name', 'user.email')
        }
      });
    });
  });

  describe('the submit callback for the complex form', function () {
    it('should return a failing promise with errors', function () {
      var result = this.$scope.afterSubmitComplex();
      $timeout.flush(2000);

      expect(result).toRejectWith(getMockData('user/errors.json'));
    });
  });

});
