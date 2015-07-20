describe('the error view', function () {
  function getAlerts() {
    return this.element.find('.alert');
  }

  beforeEach(function () {
    mox.module(
      'angularFormMessagesExample',
      'templates/afError.html'
    ).run();

    createScope({
      errors: ['This is the message', 'This is the second message']
    });
    compileHtml('<form><div af-field-wrap><div af-error></div></div></form>');
  });

  it('should show the error messages', function () {
    expect(getAlerts.call(this)).toHaveLength(this.$scope.errors.length);
  });

  it('should be added when there is a message on the scope', function () {
    var alerts = getAlerts.call(this);
    expect(alerts.eq(0).find('.sr-only')).toHaveText('Errors:');
    expect(alerts.eq(0)).toContainText(this.$scope.errors[0]);
    expect(alerts.eq(1)).toContainText(this.$scope.errors[1]);
  });

});
