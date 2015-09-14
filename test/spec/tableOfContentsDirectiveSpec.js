describe('the table of contents directive', function () {
  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    createScope();
    addSelectors(compileHtml('<table-of-contents></table-of-contents>'), {
      item: {
        repeater: 'li',
        sub: {
          link: 'a'
        }
      }
    });
  });

  it('should create a link list with routes', function () {
    expect(this.element.item()).toHaveLength(6);
    expect(this.element.item(0)).toHaveText('Simple form');
    expect(this.element.item(0).link()).toHaveAttr('href', '#/simple');
  });

});
