angular.module('angularFormMessagesExample')
  .directive('fieldState', function () {
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
