describe('the error view', function () {
  var
    template = 'templates/error.html',
    element;

  function getAlert() {
    return element.find('.alert');
  }

  beforeEach(function () {
    mox.module(template).run();
    createScope({
      errors: ['This is the message', 'This is the second message']
    });
    element = compileTemplate(template);
  });

  it('should be added when there is a message on the scope', function () {
    var alert = getAlert();
    expect(alert.find('.sr-only')).toHaveText('Errors:');
    expect(alert).toContainText(this.$scope.errors[0]);
  });

  it('should be removed when there is no message on the scope', function () {
    delete this.$scope.errors;
    this.$scope.$digest();

    expect(getAlert()).not.toExist();
  });

  it('should show the error messages in format "error, error1"', function () {
    var errors = element.find('[ng-repeat="error in errors track by $index"]');
    expect(errors).toHaveLength(this.$scope.errors.length);
    expect(errors.eq(0).find('span')).toHaveText(', ');
    expect(errors.eq(0).find('span')).not.toBeHidden();
    expect(errors.eq(1).find('span')).toBeHidden();
  });

});
