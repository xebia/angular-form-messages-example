angular.module('angularFormMessagesExample')
  // Extend the original directive to add/remove the 'has-error' class on the element
  .directive('afFieldWrap', function () {
    return {
      link: function ($scope, elem, attrs) {
        $scope.$on('validation', function onValidation(event, messageId, errors) {
          if (messageId === attrs.afFieldWrap) {
            attrs['$' + (errors.length ? 'add' : 'remove') + 'Class']('has-error');
          }
        });
      }
    };
  });
