describe('the translateService', function () {
  var TranslateService;

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    TranslateService = mox.inject('TranslateService');
  });

  describe('the getLabel() method', function () {
    it('should return the translation for a key', function () {
      expect(TranslateService.getLabel('required')).toBe('This field is required');
    });

    it('should return undefined when the translate cannot be found', function () {
      expect(TranslateService.getLabel('not existing')).toBeUndefined();
    });
  });

  describe('the hasLabel() method', function () {
    it('should return true when the label exists', function () {
      expect(TranslateService.hasLabel('required')).toBe(true);
    });

    it('should return false when the label no exists', function () {
      expect(TranslateService.hasLabel('not existing')).toBe(false);
    });
  });
});

describe('the translate filter', function () {
  var translateFilter;

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .mockServices('TranslateService')
      .setupResults(function () {
        return {
          TranslateService: { getLabel: 'label' }
        };
      })
      .run();

    translateFilter = mox.inject('translateFilter');
  });

  it('should return the translation for a key', function () {
    expect(translateFilter('required')).toBe('label');
  });

  it('should return the key when the translate cannot be found', function () {
    mox.get.TranslateService.getLabel.and.returnValue(undefined);
    expect(translateFilter('not existing')).toBe('not existing');
    expect(mox.get.TranslateService.getLabel).toHaveBeenCalledWith('not existing');
  });
});

describe('the translate directive', function () {
  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .mockServices(
        'translateFilter',
        'TranslateService'
      )
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
