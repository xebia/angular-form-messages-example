describe('the nameLength directive', function () {
  function getError(elem) {
    return elem.find('[af-field]').controller('ngModel').$error;
  }

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    createScope();
    compileHtml('<form af-submit><div af-field-wrap><input name="name" name-length="3" af-field ng-model="name"></div></form>');
  });

  it('should validate an empty name', function () {
    this.$scope.name = '';
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({});

    delete this.$scope.name;
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({});
  });

  it('should invalidate input that is too short', function () {
    this.$scope.name = 'xx';
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({ nameLength: true });
  });

  it('should validate input that is long enough', function () {
    this.$scope.name = 'xxx';
    this.$scope.$digest();
    expect(getError(this.element)).toEqual({});
  });
});
