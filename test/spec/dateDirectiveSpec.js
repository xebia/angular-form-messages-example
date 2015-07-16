describe('the date directive', function () {
  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    compileHtml('<input name="date" date ng-model="date">', createScope({
      date: '2014-02-03'
    }));
  });

  it('should validate the date', function () {
    function getError(elem) {
      return elem.controller('ngModel').$error;
    }

    expect(getError(this.element)).toEqual({});
    this.$scope.date = 'invalid date';
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({ date: true });
  });
});
