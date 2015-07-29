angular.module('angularFormMessagesExample')
  .directive('checkboxesRequired', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function ($scope, element, attrs, ngModelCtrl) {

        // Map UI onto $viewValue by explicitely change it, because render does no deep watch
        $scope.$watchCollection(ngModelCtrl.$name, function (newVal, oldVal) {
          if (angular.equals(newVal, oldVal)) { return; }
          ngModelCtrl.$setViewValue(angular.extend({}, newVal));
        });

        ngModelCtrl.$validators.required = function (modelValue, viewValue) {
          var
            value = modelValue || viewValue,
            isValid = false;

          if (!ngModelCtrl.$isEmpty(value)) {
            angular.forEach(value, function (item) {
              isValid = isValid || !!item;
            });
          }
          return isValid;
        };
      }
    };
  });
