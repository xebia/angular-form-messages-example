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

  it('should have a users for multiple forms on the scope', function () {
    expect(this.$scope.repeatingUser).toBeDefined();
    expect(this.$scope.customUser).toBeDefined();
  });

  it('should have food for the checkboxes on the scope', function () {
    expect(this.$scope.food).toEqual(['Meat', 'Fish', 'Vegetarian']);
  });

  it('should have one (non-defined) friend on the scope', function () {
    expect(this.$scope.repeatingUser.friends).toEqual([{}, {}]);
  });

  describe('the newFriend method', function () {
    it('should add a new object to the friends array', function () {
      this.$scope.newFriend();
      expect(this.$scope.repeatingUser.friends).toEqual([{}, {}, {}]);
    });
  });

  describe('the removeFriend method', function () {
    it('should remove the friend object with the given index from the friends array', function () {
      this.$scope.repeatingUser.friends[1].marker = 'this will be removed';
      this.$scope.repeatingUser.friends[0].marker = 'this will not be removed';
      this.$scope.removeFriend(1);
      expect(this.$scope.repeatingUser.friends).toEqual([{ marker: 'this will not be removed' }]);
    });
  });

  describe('the submit callback for the simple form', function () {
    it('should return a failing promise with errors', function () {
      var result = this.$scope.submitSimple();
      $timeout.flush(1000);

      expect(result).toRejectWith({
        validation: {
          userForm: _.pick(getMockData('user/errors.json').validation.userForm, '$messages', 'user.name', 'user.email')
        }
      });
    });
  });

  describe('the submit callback for the trigger form', function () {
    it('should return a failing promise with errors', function () {
      var result = this.$scope.submitTrigger();
      $timeout.flush(1000);

      expect(result).toRejectWith({
        validation: {
          triggerForm: _.pick(getMockData('user/errors.json').validation.userForm, '$messages', 'user.name', 'user.email', 'user.gender')
        }
      });
    });
  });

  describe('the submit callback for the repeating form', function () {
    it('should return a failing promise with errors', function () {
      var result = this.$scope.submitRepeating();
      $timeout.flush(1000);

      expect(result).toRejectWith({
        validation: {
          friendsForm1: getMockData('user/errors.json').validation.friendsForm1
        }
      });
    });
  });

  describe('the submit callback for the form with custom directives', function () {
    it('should return a failing promise with errors', function () {
      var result = this.$scope.submitCustom();
      $timeout.flush(1000);

      expect(result).toRejectWith({
        validation: {
          customForm: _.pick(getMockData('user/errors.json').validation.userForm, 'user.food')
        }
      });
    });
  });

});
