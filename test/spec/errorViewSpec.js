describe('the error view', function () {
  var
    template = 'templates/error.html',
    element;

  function getAlert() {
    return element.find('.alert');
  }

  beforeEach(function () {
    mox.module(template).run();
    element = compileTemplate(template, createScope({
      errors: ['This is the message']
    }));
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

});
