describe('afFieldWrap', function () {

  function sendValidation(fieldName, messages, messageType) {
    inj.$rootScope.$broadcast('validation', fieldName, messages, messageType);
    this.$scope.$digest();
  }

  function setup(messageType, fieldName) {
    if (messageType) {
      this.element.removeClass('has-' + messageType.toLowerCase());
      this.element.removeClass('has-feedback');
    } else {
      this.element.addClass('has-feedback');
    }
    this.element.addClass(messageType === inj.MESSAGE_TYPES[3] ? 'has-warning has-info has-success' : 'has-error');

    sendValidation.call(this, fieldName, [], messageType);
  }

  function checkMessageClass(className, invert) {
    var ex = expect(this.element);
    if (invert) {
      ex = ex.not;
    }
    ex.toHaveClass(className);
  }

  var
    inj,

    errorSetup = _.partial(setup, 'ERROR'),
    warningSetup = _.partial(setup, 'WARNING'),
    infoSetup = _.partial(setup, 'INFO'),
    successSetup = _.partial(setup, 'SUCCESS'),
    noMessageSetup = _.partial(setup, false),

    expectHasError = _.partial(checkMessageClass, 'has-error'),
    expectHasWarning = _.partial(checkMessageClass, 'has-warning'),
    expectHasInfo = _.partial(checkMessageClass, 'has-info'),
    expectHasSuccess = _.partial(checkMessageClass, 'has-success'),
    expectHasFeedback = _.partial(checkMessageClass, 'has-feedback'),

    expectHasNoError = _.partial(checkMessageClass, 'has-error', true),
    expectHasNoWarning = _.partial(checkMessageClass, 'has-warning', true),
    expectHasNoInfo = _.partial(checkMessageClass, 'has-info', true),
    expectHasNoSuccess = _.partial(checkMessageClass, 'has-success', true),
    expectHasNoFeedback = _.partial(checkMessageClass, 'has-feedback', true);

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();
    inj = mox.inject('$rootScope', 'MESSAGE_TYPES');

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
          it('should add the "has-feedback" class to the element"', expectHasFeedback);
          it('should remove the "has-error" class from the element', expectHasNoError);
          it('should remove the "has-warning" class from the element', expectHasNoWarning);
          it('should remove the "has-info" class from the element', expectHasNoInfo);
        });

        describe('when the validation is "error"', function () {
          beforeEach(_.partial(errorSetup, 'user.name'));

          it('should add the "has-error" class to the element', expectHasError);
          it('should add the "has-feedback" class to the element"', expectHasFeedback);
          it('should remove the "has-warning" class from the element', expectHasNoWarning);
          it('should remove the "has-info" class from the element', expectHasNoInfo);
          it('should remove the "has-success" class from the element', expectHasNoSuccess);
        });

        describe('when the validation is "warning"', function () {
          beforeEach(_.partial(warningSetup, 'user.name'));

          it('should add the "has-warning" class to the element', expectHasWarning);
          it('should add the "has-feedback" class to the element"', expectHasFeedback);
          it('should remove the "has-error" class from the element', expectHasNoError);
          it('should remove the "has-info" class from the element', expectHasNoInfo);
          it('should remove the "has-success" class from the element', expectHasNoSuccess);
        });

        describe('when the validation is "info"', function () {
          beforeEach(_.partial(infoSetup, 'user.name'));

          it('should add the "has-warning" class to the element', expectHasInfo);
          it('should remove the "has-error" class from the element', expectHasNoError);
          it('should remove the "has-warning" class from the element', expectHasNoWarning);
          it('should remove the "has-success" class from the element', expectHasNoSuccess);
        });

        describe('when the validation is "success"', function () {
          beforeEach(_.partial(successSetup, 'user.name'));

          it('should add the "has-success" class to the element', expectHasSuccess);
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
