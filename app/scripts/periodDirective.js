angular.module('angularFormMessagesExample')
  .directive('period', function (DateUtils) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        period: '=ngModel'
      },
      templateUrl: 'templates/periodDirective.html',
      link: function ($scope, elem, attrs, ngModelCtrl) {

        // Map model onto $viewValue
        ngModelCtrl.$formatters.push(function (modelValue) {
          return modelValue;
        });

        // Map $viewValue onto UI
        ngModelCtrl.$render = function () {
          if (angular.isObject(ngModelCtrl.$viewValue)) {
            $scope.from = ngModelCtrl.$viewValue.from;
            $scope.to = ngModelCtrl.$viewValue.to;
          }
        };

        // Map $viewValue onto $modelValue
        ngModelCtrl.$parsers.push(function (viewValue) {
          return {
            from: viewValue.from,
            to: viewValue.to
          };
        });

        // Map UI onto $viewValue
        $scope.$watch('[from, to]', function (newVal) {
          function validateDate(dateString) {
            if (dateString === undefined) { return; }
            return DateUtils.isDate(dateString) && moment(dateString, 'YYYY-MM-DD').isValid() ?
              dateString : undefined;
          }
          ngModelCtrl.$setViewValue({
            from: validateDate(newVal[0]),
            to: validateDate(newVal[1])
          });
        });

        ngModelCtrl.$validators.period = function (modelValue, viewValue) {
          var value = modelValue || viewValue;
          return value === undefined || value.from === undefined || value.to === undefined || // No date provided
                 !DateUtils.isDate(value.from, 'YYYY-MM-DD') || !DateUtils.isDate(value.to) || // Invalid date
                 moment(value.from, 'YYYY-MM-DD').isBefore(moment(value.to));
        };
      }
    };
  });
