describe('the checkboxesRequired directive', function () {

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    createScope();
    addSelectors(compileHtml('<div checkboxes-required ng-model="food" name="food">' +
                  '<input type="checkbox" ng-model="food.first" name="food.first">' +
                  '<input type="checkbox" ng-model="food.second" name="food.second">' +
                '</div>'), {
      firstCheckbox: '[name="food.first"]',
      secondCheckbox: '[name="food.second"]'
    });
  });

  function checkError(error) {
    expect(this.element.controller('ngModel').$error).toEqual(error);
  }

  it('should validate when one checkbox is checked', function () {
    this.element.firstCheckbox().click();
    checkError.call(this, {});
  });

  it('should validate when multiple checkboxes are checked', function () {
    this.element.secondCheckbox().click();
    this.element.firstCheckbox().click();
    this.$scope.$digest();
    checkError.call(this, {});
  });

  it('should invalidate when no checkboxes are checked', function () {
    checkError.call(this, { required: true });

    this.element.firstCheckbox().click();
    this.element.firstCheckbox().click();
    checkError.call(this, { required: true });
  });
});
