describe('the nameLength directive', function () {
  function getError(elem) {
    return elem.find('[af-field]').controller('ngModel').$error;
  }

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    createScope();
    compileHtml('<form af-submit><input name="name" name-length="3" af-field ng-model="name"></form>');
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

  it('should set the message type to warning', function () {
    var afFieldCtrl = this.element.find('[af-field]').controller('afField');
    spyOn(afFieldCtrl, 'setWarning');

    this.$scope.name = 'x';
    this.$scope.$digest();
    expect(afFieldCtrl.setWarning).toHaveBeenCalledWith('nameLength', false);

    this.$scope.name = '';
    this.$scope.$digest();
    expect(afFieldCtrl.setWarning).toHaveBeenCalledWith('nameLength', true);
  });
});
