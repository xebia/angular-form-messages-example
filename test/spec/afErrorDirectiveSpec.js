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
      messages: [
        { message: 'This is the message', type: 'error' },
        { message: 'This is the second message', type: 'warning' },
        { message: 'This is the third message', type: 'info' },
        { message: 'This is the fourth message', type: 'success' }
      ]
    });
    compileHtml('<form><div af-field-wrap><div af-error></div></div></form>');
  });

  it('should show the error messages', function () {
    expect(getAlerts.call(this)).toHaveLength(this.$scope.messages.length);
  });

  it('should be added when there is a message on the scope', function () {
    var alerts = getAlerts.call(this);
    expect(alerts.eq(0).find('.sr-only')).toHaveText('Errors:');
    expect(alerts.eq(0)).toContainText(this.$scope.messages[0].message);
    expect(alerts.eq(1)).toContainText(this.$scope.messages[1].message);
  });

  it('should show a class for messages with type error, warning, info and success', function () {
    var alerts = getAlerts.call(this);
    expect(alerts.eq(0)).toHaveClass('alert-danger');
    expect(alerts.eq(1)).toHaveClass('alert-warning');
    expect(alerts.eq(2)).toHaveClass('alert-info');
    expect(alerts.eq(3)).toHaveClass('alert-success');
  });

});
