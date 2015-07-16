describe('the date directive', function () {
  function getError(elem) {
    return elem.controller('ngModel').$error;
  }

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    createScope();
    compileHtml('<input name="date" date ng-model="date">');
  });

  it('should validate an empty date', function () {
    this.$scope.date = '';
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({});

    delete this.$scope.date;
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({});
  });

  it('should invalidate input that is not a date', function () {
    this.$scope.date = 'invalid date';
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({ date: true });
  });

  it('should validate input that is a date', function () {
    this.$scope.date = '2014-02-03';
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({});
  });
});
