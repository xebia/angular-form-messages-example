angular.module('angularFormMessagesExample')
  .directive('date', function (DateUtils) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function ($scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$validators.date = function (modelValue, viewValue) {
          var value = modelValue || viewValue;
          return ngModelCtrl.$isEmpty(value) || DateUtils.isDate(value);
        };
      }
    };
  });
