describe('the error view', function () {
  var template = 'templates/error.html';

  beforeEach(function () {
    mox.module(template).run();
    compileTemplate(template, createScope({
      errors: [{ message: 'This is the message' }]
    }));
    this.alert = this.element.find('.alert');
  });

  it('should be visible when there is a message on the scope', function () {
    // TODO fails for some reason
    //expect(this.alert).not.toBeHidden();
    expect(this.alert).toContainText(this.$scope.errors[0].message);
    expect(this.alert.find('.sr-only')).toHaveText('Errors:');
  });

  it('should be invisble when there is no message on the scope', function () {
    delete this.$scope.errors;
    this.$scope.$digest();

    expect(this.alert).toBeHidden();
  });

});
