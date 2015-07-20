describe('afFieldWrap', function () {

  function setup(invalid, fieldName) {
    this.element.removeClass(invalid ? 'has-error' : 'has-success');
    this.element.addClass(invalid ? 'has-success' : 'has-error');
    $rootScope.$broadcast('validation', fieldName, invalid ? ['Error'] : []);
    this.$scope.$digest();
  }

  function checkErrorClass(className, invert) {
    var ex = expect(this.element);
    if (invert) {
      ex = ex.not;
    }
    ex.toHaveClass(className);
  }

  var
    $rootScope,
    invalidSetup = _.partial(setup, true),
    validSetup = _.partial(setup, false),
    expectHasSuccess = _.partial(checkErrorClass, 'has-success'),
    expectHasError = _.partial(checkErrorClass, 'has-error'),
    expectHasNoSuccess = _.partial(checkErrorClass, 'has-success', true),
    expectHasNoError = _.partial(checkErrorClass, 'has-error', true);

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    inject(function (_$rootScope_) {
      $rootScope = _$rootScope_;
    });

    createScope();
    this.element = compileHtml('<form name="userForm" af-submit>' +
                                 '<div af-field-wrap="user.name" field-state></div>' +
                               '</form>', this.$scope).find('[field-state]');
  });

  describe('when a validation event has been fired', function () {

    describe('when it is meant for the field wrap with the modelPath attached to the event', function () {

      function showSuccess(value) {
        this.element.parent().controller('afSubmit').showSuccess = value;
      }

      describe('when showSuccess is true on the afSubmit directive', function () {
        beforeEach(_.partial(showSuccess, true));

        describe('when the validation is "valid"', function () {
          beforeEach(_.partial(validSetup, 'user.name'));

          it('should remove the "has-error" class from the element', expectHasNoError);

          it('should add the "has-success" class to the element', expectHasSuccess);
        });

        describe('when the validation is "invalid"', function () {
          beforeEach(_.partial(invalidSetup, 'user.name'));

          it('should add a "has-error" class to the element', expectHasError);

          it('should remove the "has-success" class from the element', expectHasNoSuccess);
        });
      });

      describe('when showSuccess is false on the afSubmit directive', function () {
        beforeEach(_.partial(showSuccess, false));

        describe('when the validation is "valid"', function () {
          beforeEach(_.partial(validSetup, 'user.name'));

          it('should not add the "has-success" class', expectHasNoSuccess);
        });

        describe('when the validation is "invalid"', function () {
          beforeEach(_.partial(invalidSetup, 'user.name'));

          it('should not remove the "has-success" class', expectHasSuccess);
        });
      });
    });

    describe('when it is not meant for this field wrap', function () {

      it('should not add the "has-error" class', function () {
        invalidSetup.call(this, 'user.other');
        expectHasNoError.call(this);
      });

      it('should not remove the "has-error" class', function () {
        validSetup.call(this, 'user.other');
        expectHasError.call(this);
      });
    });

  });
});
