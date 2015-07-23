describe('the error view', function () {

  beforeEach(function () {
    mox.module(
      'angularFormMessagesExample',
      'templates/afError.html'
    ).run();

    var MESSAGE_TYPES = mox.inject('MESSAGE_TYPES');

    createScope({
      messages: [
        { message: 'This is the message', type: MESSAGE_TYPES[3] },
        { message: 'This is the second message', type: MESSAGE_TYPES[2] },
        { message: 'This is the third message', type: MESSAGE_TYPES[1] },
        { message: 'This is the fourth message', type: MESSAGE_TYPES[0] }
      ]
    });

    this.element = addSelectors(compileHtml('<form><div af-field-wrap="user.name"><div af-error></div></div></form>'), {
      alerts: '.alert',
      alert: '.alert:eq({0})'
    });
  });

  it('should show the error messages', function () {
    expect(this.element.alerts()).toHaveLength(this.$scope.messages.length);
  });

  it('should be added when there is a message on the scope', function () {
    expect(this.element.alert(0).find('.sr-only')).toHaveText('Errors:');
    expect(this.element.alert(0)).toContainText(this.$scope.messages[0].message);
    expect(this.element.alert(1)).toContainText(this.$scope.messages[1].message);
  });

  it('should show a class for messages with type error, warning, info and success', function () {
    expect(this.element.alert(0)).toHaveClass('alert-danger');
    expect(this.element.alert(1)).toHaveClass('alert-warning');
    expect(this.element.alert(2)).toHaveClass('alert-info');
    expect(this.element.alert(3)).toHaveClass('alert-success');
  });

});
