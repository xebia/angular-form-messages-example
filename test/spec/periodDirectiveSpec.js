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
        'date'
      )
      .run();

    createScope();
    compileHtml('<div period ng-model="period" name="period"></div>');
  });

  function checkError(error) {
    expect(this.element.controller('ngModel').$error).toEqual(error);
  }

  describe('validating the date and settings the model', function () {

    it('should validate when period is undefined or the "from" date or the "to" date is undefined', function () {
      // Period undefined
      checkError.call(this, {});

      // From undefined
      this.$scope.period = {
        from: undefined,
        to: '2014-02-03'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});

      // To undefined
      this.$scope.period = {
        from: '2014-02-03',
        to: undefined
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});
    });

    it('should validate when the "from" date or the "to" date is invalid', function () {
      // From invalid
      this.$scope.period = {
        from: 'invalid date',
        to: '2014-02-03'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});

      // To invalid
      this.$scope.period = {
        from: '2014-02-03',
        to: 'invalid date'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});
    });

    it('should validate when the "from" date is before the "to" date', function () {
      this.$scope.period = {
        from: '2014-02-03',
        to: '2014-02-04'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      checkError.call(this, {});
    });

    it('should invalidate when the "from" date is not before the "to" date', function () {
      this.$scope.period = {
        from: '2014-02-03',
        to: '2014-02-03'
      };

      this.$scope.$digest();
      expect(this.$scope.period).toBeUndefined();
      checkError.call(this, { period: true });

      this.$scope.period = {
        from: '2014-02-03',
        to: '2014-02-02'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeUndefined();
      checkError.call(this, { period: true });
    });
  });
});
