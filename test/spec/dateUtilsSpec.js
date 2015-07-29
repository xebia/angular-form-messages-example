describe('the DateUtils', function () {
  var DateUtils;

  beforeEach(function () {
    mox
      .module('angularFormMessagesExample')
      .run();

    DateUtils = mox.inject('DateUtils');
  });

  it('should return false when input is not a date string in format YYYY-MM-DD', function () {
    expect(DateUtils.isDate('invalid date')).toBe(false);
    expect(DateUtils.isDate('02-02-2012')).toBe(false);
    expect(DateUtils.isDate('2012-30-02')).toBe(false);
  });

  it('should return true when input is not a date string', function () {
    expect(DateUtils.isDate('2012-2-2')).toBe(true);
    expect(DateUtils.isDate('2012-02-02')).toBe(true);
    expect(DateUtils.isDate('2012/02/02')).toBe(true);
    expect(DateUtils.isDate('2012-02-30')).toBe(true); // Yes, this really validates ;-)
  });
});
