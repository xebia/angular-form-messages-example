angular.module('angularFormMessagesExample')
  .directive('period', function () {
    return {
      require: 'ngModel',
      scope: {
        period: '=ngModel'
      },
      templateUrl: 'scripts/periodDirective.html',
      link: function ($scope, elem, attrs, ngModelCtrl) {

        // Map model onto $viewValue
        ngModelCtrl.$formatters.push(function(modelValue) {
          return modelValue;
        });

        // Map $viewValue onto UI
        ngModelCtrl.$render = function () {
          if (ngModelCtrl.$viewValue === undefined) { return; }
          $scope.from = ngModelCtrl.$viewValue.from;
          $scope.to = ngModelCtrl.$viewValue.to;
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
            return dateString.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) && moment(dateString, 'YYYY-MM-DD').isValid() ?
              dateString : undefined;
          }
          ngModelCtrl.$setViewValue({
            from: validateDate(newVal[0]),
            to: validateDate(newVal[1])
          });
        });

        ngModelCtrl.$validators.period = function(modelValue, viewValue) {
          console.log(modelValue, viewValue);

          var value = modelValue || viewValue;
          return value.from === undefined || value.to === undefined || moment(value.from).isBefore(moment(value.to));
        };

        $scope.period = {
          from: '2013-22-03',
          to: '2014-02-03'
        };
      }
    };
  });
