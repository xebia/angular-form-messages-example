describe('afFieldWrap', function () {
  var $rootScope;

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    inject(function (_$rootScope_) {
      $rootScope = _$rootScope_;
    });

    createScope();
    this.element = compileHtml('<form name="userForm"><div af-field-wrap="user.name"></div></form>', this.$scope).find('[af-field-wrap]');
  });

  describe('when a validation event has been fired', function () {
    describe('when it is meant for the field wrap with the modelPath attached to the event', function () {
      describe('when the validation is "valid"', function () {
        beforeEach(function () {
          this.element.addClass('has-error');
          $rootScope.$broadcast('validation', 'user.name', []);
        });

        it('should remove the "has-error" class from the element', function () {
          expect(this.element).not.toHaveClass('has-error');
        });
      });

      describe('when the validation is "invalid"', function () {
        beforeEach(function () {
          this.element.removeClass('has-error');
          $rootScope.$broadcast('validation', 'user.name', ['Error']);
        });

        it('should add a "has-error" class to the element', function () {
          expect(this.element).toHaveClass('has-error');
        });
      });
    });

    describe('when it is not meant for this field wrap', function () {

      it('should not add the "has-error" class', function () {
        this.element.removeClass('has-error');
        $rootScope.$broadcast('validation', 'user.other', ['Error']);
        expect(this.element).not.toHaveClass('has-error');
      });

      it('should not remove the "has-error" class', function () {
        this.element.addClass('has-error');
        $rootScope.$broadcast('validation', 'user.other', []);
        expect(this.element).toHaveClass('has-error');
      });
    });

  });
});
