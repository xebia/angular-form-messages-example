describe('the period directive', function () {

  function getError(elem) {
    return elem.controller('ngModel').$error;
  }

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
    compileHtml('<div period ng-model="period" name="period"></div>');
  });

  describe('validating the date and settings the model', function () {

    it('should validate when period is undefined or the "from" date or the "to" date is undefined', function () {
      // Period undefined
      expect(this.element.controller('ngModel').$error).toEqual({});

      // From undefined
      this.$scope.period = {
        from: undefined,
        to: '2014-02-03'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      expect(this.element.controller('ngModel').$error).toEqual({});

      // To undefined
      this.$scope.period = {
        from: '2014-02-03',
        to: undefined
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      expect(this.element.controller('ngModel').$error).toEqual({});
    });

    it('should validate when the "from" date or the "to" date is invalid', function () {
      // From invalid
      this.$scope.period = {
        from: 'invalid date',
        to: '2014-02-03'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      expect(this.element.controller('ngModel').$error).toEqual({});

      // To invalid
      this.$scope.period = {
        from: '2014-02-03',
        to: 'invalid date'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      expect(this.element.controller('ngModel').$error).toEqual({});
    });

    it('should validate when the "from" date is before the "to" date', function () {
      this.$scope.period = {
        from: '2014-02-03',
        to: '2014-02-04'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeDefined();
      expect(this.element.controller('ngModel').$error).toEqual({});
    });

    it('should invalidate when the "from" date is not before the "to" date', function () {
      this.$scope.period = {
        from: '2014-02-03',
        to: '2014-02-03'
      };

      this.$scope.$digest();
      expect(this.$scope.period).toBeUndefined();
      expect(getError(this.element)).toEqual({ period: true });

      this.$scope.period = {
        from: '2014-02-03',
        to: '2014-02-02'
      };
      this.$scope.$digest();
      expect(this.$scope.period).toBeUndefined();
      expect(getError(this.element)).toEqual({ period: true });
    });
  });
});
