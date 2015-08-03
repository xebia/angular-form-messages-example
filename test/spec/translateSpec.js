describe('the translate filter', function () {
  var translateFilter;

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    translateFilter = mox.inject('translateFilter');
  });

  it('should return the translation for a key', function () {
    expect(translateFilter('required')).toBe('This field is required');
  });

  it('should return the key when the translate cannot be found', function () {
    expect(translateFilter('not existing')).toBe('not existing');
  });
});

describe('the translate directive', function () {
  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .mockServices('translateFilter')
      .setupResults(function () {
        return {
          translateFilter: 'Required translation'
        };
      })
      .run();

    createScope();
    compileHtml('<span translate="required">Content</span>');
  });

  it('should use the translateFilter to replace the contents of the element with the translation', function () {
    expect(this.element).toHaveText('Required translation');
    expect(mox.get.translateFilter).toHaveBeenCalledWith('required');
  });

  it('should not evaluate the translate attribute', function () {
    compileHtml('<span translate="true"></span>');
    expect(mox.get.translateFilter).toHaveBeenCalledWith('true');
  });
});
