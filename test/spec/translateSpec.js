describe('the $translate service', function () {
  var $translate;

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    $translate = mox.inject('$translate');
  });

  it('should return the translation for a key', function () {
    expect($translate('required')).toResolveWith('This field is required');
  });

  it('should return the key when the translate cannot be found', function () {
    expect($translate('not existing')).toRejectWith('not existing');
  });

});

describe('the translate directive', function () {
  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .mockServices(
        '$translate'
      )
      .setupResults(function () {
        return {
          $translate: function (key) {
            return key === 'required' ? promise('Required translation') : reject(key);
          }
        };
      })
      .run();

    createScope();
    compileHtml('<span translate="required">Content</span>');
  });

  it('should use the translateFilter to replace the contents of the element with the translation', function () {
    expect(this.element).toHaveText('Required translation');
    expect(mox.get.$translate).toHaveBeenCalledWith('required');
  });

  it('should not evaluate the translate attribute', function () {
    compileHtml('<span translate="true"></span>');
    expect(mox.get.$translate).toHaveBeenCalledWith('true');
  });
});
