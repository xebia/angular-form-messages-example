describe('the nameLength directive', function () {
  function expectWarning(error, isValid) {
    expect(this.element.controller('afField').setWarningDetails).toHaveBeenCalledWith('nameLength', isValid);
    expect(this.element.controller('ngModel').$error).toEqual(error);
  }

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .mockDirectives({
        name: 'afField',
        controller: function () {
          this.setWarningDetails = jasmine.createSpy('setWarningDetails');
        }
      })
      .run();

    createScope();
    compileHtml('<input name="name" name-length="3" af-field ng-model="name">');
    this.element.controller('afField').setWarningDetails.calls.reset();
  });

  describe('when the field is empty', function () {

    it('should validate and remove the message type warning', function () {
      this.element.val('').trigger('input');
      expectWarning.call(this, {}, true);
    });
  });

  describe('when the field has input that is too short', function () {

    it('should invalidate and set the message type to warning', function () {
      this.element.val('xx').trigger('input');
      expectWarning.call(this, { nameLength: true }, false);
    });
  });

  describe('when the field has input that is long enough', function () {

    it('should validate and remove the message type warning', function () {
      this.element.val('xxx').trigger('input');
      expectWarning.call(this, {}, true);
    });
  });
});
