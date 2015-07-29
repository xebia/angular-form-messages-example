describe('the date directive', function () {
  function expectError(error) {
    expect(this.element.controller('ngModel').$error).toEqual(error);
  }

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .mockServices('DateUtils')
      .setupResults(function () {
        return {
          DateUtils: { isDate: false }
        };
      })
      .run();

    createScope();
    compileHtml('<input name="date" date ng-model="date">');
  });

  it('should validate an empty date', function () {
    this.element.val('').trigger('input');
    expectError.call(this, {});
  });

  it('should invalidate input that is not a date', function () {
    this.element.val('invalid date').trigger('input');
    expectError.call(this, { date: true });
  });

  it('should validate input that is a date', function () {
    mox.get.DateUtils.isDate.and.returnValue(true);
    this.element.val('2014-02-03').trigger('input');
    expectError.call(this, {});
  });
});
