describe('the period directive', function () {

  beforeEach(function () {
    mox
      .module(
        'angularFormMessagesExample',
        'templates/periodDirective.html'
      )
      .mockDirectives(
        'afMessage',
        'afField',
        'afFeedback',
        'afFieldState',
        'date'
      )
      .run();

    createScope();
    addSelectors(compileHtml('<div period ng-model="period" name="period"></div>'), {
      date: '[date]:eq({0})'
    });
  });

  function setDate(index, value) {
    this.element.date(index).val(value).trigger('input');
  }

  function checkError(error) {
    expect(this.element.controller('ngModel').$error).toEqual(error);
  }

  describe('validating the date and settings the model', function () {

    it('should validate when period is undefined or the "from" date or the "to" date is undefined', function () {
      // Period undefined
      checkError.call(this, {});

      // From undefined
      setDate.call(this, 1, '2014-02-03');
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});

      // To undefined
      setDate.call(this, 0, '2014-02-03');
      setDate.call(this, 1, '');

      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});
    });

    it('should validate when the "from" date or the "to" date is invalid', function () {
      // From invalid
      setDate.call(this, 0, 'invalid date');
      setDate.call(this, 1, '2014-02-03');
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});

      // To invalid
      setDate.call(this, 0, '2014-02-03');
      setDate.call(this, 1, 'invalid date');
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});
    });

    it('should validate when the "from" date is before the "to" date', function () {
      this.element.date(0).val('2014-02-03').trigger('input');
      this.element.date(1).val('2014-02-04').trigger('input');
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});
    });

    it('should invalidate when the "from" date is not before the "to" date', function () {
      setDate.call(this, 0, '2014-02-03');
      setDate.call(this, 1, '2014-02-03');

      expect(this.$scope.period).toBeUndefined();
      checkError.call(this, { period: true });

      this.element.date(0).val('2014-02-03').trigger('input');
      this.element.date(1).val('2014-02-02').trigger('input');
      expect(this.$scope.period).toBeUndefined();
      checkError.call(this, { period: true });
    });

    it('should set the date fields when a period is set and validate', function () {
      this.$scope.period = { from: '2014-02-03', to: '2014-02-04' };
      this.$scope.$digest();
      expect(this.element.date(0).val()).toBe('2014-02-03');
      expect(this.element.date(1).val()).toBe('2014-02-04');
      checkError.call(this, {});
    });
  });
});
