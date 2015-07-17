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
    compileHtml('<div af-field-wrap af-model-path="user.name"></div>', this.$scope);
  });

  describe('when a validation event has been fired', function () {
    describe('when it is meant for the field wrap with the modelPath attached to the event', function () {
      describe('when the validation is "valid"', function () {
        beforeEach(function () {
          this.element.addClass('has-error');
          $rootScope.$broadcast('validation', 'user.name', []);
          this.$scope.$digest();
        });

        it('should remove the "has-error" class from the element', function () {
          expect(this.element).not.toHaveClass('has-error');
        });
      });

      describe('when the validation is "invalid"', function () {
        beforeEach(function () {
          this.element.removeClass('has-error');
          $rootScope.$broadcast('validation', 'user.name', ['Error']);
          this.$scope.$digest();
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
        this.$scope.$digest();
        expect(this.element).not.toHaveClass('has-error');
      });

      it('should not remove the "has-error" class', function () {
        this.element.addClass('has-error');
        $rootScope.$broadcast('validation', 'user.other', []);
        this.$scope.$digest();
        expect(this.element).toHaveClass('has-error');
      });
    });

  });
});
