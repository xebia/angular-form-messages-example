describe('afFieldWrap', function () {

  function sendValidation(fieldName, messages) {
    $rootScope.$broadcast('validation', fieldName, messages);
    this.$scope.$digest();
  }

  function setup(messageType, fieldName) {
    if (messageType) {
      this.element.removeClass('has-' + messageType);
    }
    this.element.addClass(messageType === 'error' ? 'has-warning has-info has-success' : 'has-error');

    sendValidation.call(this, fieldName, messageType ? [{ message: 'Error', type: messageType }] : []);
  }

  function errorWarningSetup() {
    this.element.addClass('has-warning');

    sendValidation.call(this, 'user.name', [
      { message: 'Error', type: 'error' },
      { message: 'Warning', type: 'warning' }
    ]);
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

    errorSetup = _.partial(setup, 'error'),
    warningSetup = _.partial(setup, 'warning'),
    infoSetup = _.partial(setup, 'info'),
    successSetup = _.partial(setup, 'success'),
    noMessageSetup = _.partial(setup, false),

    expectHasError = _.partial(checkErrorClass, 'has-error'),
    expectHasWarning = _.partial(checkErrorClass, 'has-warning'),
    expectHasInfo = _.partial(checkErrorClass, 'has-info'),
    expectHasSuccess = _.partial(checkErrorClass, 'has-success'),

    expectHasNoError = _.partial(checkErrorClass, 'has-error', true),
    expectHasNoWarning = _.partial(checkErrorClass, 'has-warning', true),
    expectHasNoInfo = _.partial(checkErrorClass, 'has-info', true),
    expectHasNoSuccess = _.partial(checkErrorClass, 'has-success', true);

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
          beforeEach(_.partial(noMessageSetup, 'user.name'));

          it('should add the "has-success" class to the element', expectHasSuccess);
          it('should remove the "has-error" class from the element', expectHasNoError);
          it('should remove the "has-warning" class from the element', expectHasNoWarning);
          it('should remove the "has-info" class from the element', expectHasNoInfo);
        });

        describe('when the validation is "error"', function () {
          beforeEach(_.partial(errorSetup, 'user.name'));

          it('should add a "has-error" class to the element', expectHasError);
          it('should remove the "has-warning" class from the element', expectHasNoWarning);
          it('should remove the "has-info" class from the element', expectHasNoInfo);
          it('should remove the "has-success" class from the element', expectHasNoSuccess);
        });

        describe('when the validation is "warning"', function () {
          beforeEach(_.partial(warningSetup, 'user.name'));

          it('should add a "has-warning" class to the element', expectHasWarning);
          it('should remove the "has-error" class from the element', expectHasNoError);
          it('should remove the "has-info" class from the element', expectHasNoInfo);
          it('should remove the "has-success" class from the element', expectHasNoSuccess);
        });

        describe('when the validation is "info"', function () {
          beforeEach(_.partial(infoSetup, 'user.name'));

          it('should add a "has-warning" class to the element', expectHasInfo);
          it('should remove the "has-error" class from the element', expectHasNoError);
          it('should remove the "has-warning" class from the element', expectHasNoWarning);
          it('should remove the "has-success" class from the element', expectHasNoSuccess);
        });

        describe('when the validation is "success"', function () {
          beforeEach(_.partial(successSetup, 'user.name'));

          it('should add a "has-success" class to the element', expectHasSuccess);
          it('should remove the "has-error" class from the element', expectHasNoError);
          it('should remove the "has-warning" class from the element', expectHasNoWarning);
          it('should remove the "has-info" class from the element', expectHasNoInfo);
        });
      });

      describe('when showSuccess is false on the afSubmit directive', function () {
        beforeEach(_.partial(showSuccess, false));

        describe('when the validation is "valid"', function () {
          beforeEach(_.partial(noMessageSetup, 'user.name'));

          it('should not add the "has-success" class', expectHasNoSuccess);
        });

        describe('when the validation is "error"', function () {
          beforeEach(_.partial(errorSetup, 'user.name'));

          it('should remove the "has-success" class', expectHasNoSuccess);
        });

        describe('when the validation is "success"', function () {
          beforeEach(_.partial(successSetup, 'user.name'));

          it('should add the "has-success" class', expectHasSuccess);
        });
      });

      describe('when there are two messages', function () {
        beforeEach(_.partial(errorWarningSetup));

        it('should add the class with the highest severity', expectHasError);
        it('should not add the class with the lower severity', expectHasNoWarning);
      });
    });

    describe('when it is not meant for this field wrap', function () {

      it('should not add the "has-error" class', function () {
        errorSetup.call(this, 'user.other');
        expectHasNoError.call(this);
      });

      it('should not remove the "has-error" class', function () {
        noMessageSetup.call(this, 'user.other');
        expectHasError.call(this);
      });
    });

  });
});
