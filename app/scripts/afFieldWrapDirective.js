angular.module('angularFormMessagesExample')
  // Extend the original directive to add/remove the 'has-error' class on the element
  .directive('afFieldWrap', function () {
    return {
      link: function ($scope, elem, attrs) {
        $scope.$on('validation', function onValidation(event, modelPath, errors) {
          if (modelPath === attrs.afModelPath) {
            elem[(errors.length ? 'add' : 'remove') + 'Class']('has-error');
          }
        });
      }
    };
  });
