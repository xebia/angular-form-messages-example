angular.module('angularFormMessagesExample')
  // Custom directive for showing a warning when the field is
  // ng-min-length could not be used because that shows an error instead of warning
  .directive('nameLength', function () {
    return {
      restrict: 'A',
      require: ['ngModel', 'afField'],
      link: function ($scope, element, attrs, ctrls) {
        var ngModelCtrl = ctrls[0];
        var afFieldCtrl = ctrls[1];

        ngModelCtrl.$validators.nameLength = function (modelValue, viewValue) {
          var value = modelValue || viewValue;
          var isValid = ngModelCtrl.$isEmpty(value) || value.length >= attrs.nameLength;
          afFieldCtrl.setWarningDetails('nameLength', isValid);
          return isValid;
        };
      }
    };
  });
