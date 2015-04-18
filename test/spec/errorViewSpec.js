describe('the error view', function () {
  var template = 'templates/error.html';

  beforeEach(function () {
    mox.module(template).run();
    compileTemplate(template, createScope({
      message: 'This is the message'
    }));
    // Temp, because next version of Mox will have this functionality by default
    angular.element(document.body).append(this.element);
    this.alert = this.element.find('.alert');
  });

  it('should be visible when there is a message on the scope', function () {
    expect(this.alert).not.toBeHidden();
    expect(this.alert).toContainText(this.$scope.message);
    expect(this.alert.find('.sr-only')).toHaveText('Error:');
  });

  it('should be invisble when there is no message on the scope', function () {
    delete this.$scope.message;
    this.$scope.$digest();

    expect(this.alert).toBeHidden();
  });

});
