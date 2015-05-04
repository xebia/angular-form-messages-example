angular.module('angularFormMessagesExample')
  // Extend the original directive to add/remove the 'has-error' class on the element
  .directive('afFieldWrap', function () {
    return {
      link: function ($scope, elem, attrs) {
        $scope.$on('validation', function onValidation(event, modelPath, isValid) {
          if (modelPath === attrs.afModelPath) {
            elem[(isValid ? 'remove' : 'add') + 'Class']('has-error');
          }
        });
      }
    };
  });