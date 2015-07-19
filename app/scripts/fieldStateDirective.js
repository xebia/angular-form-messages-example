angular.module('angularFormMessagesExample')
  .directive('fieldState', function () {
    return {
      require: '^afSubmit',
      link: function ($scope, elem, attrs, afSubmitCtrl) {
        $scope.$on('validation', function onValidation(event, messageId, errors) {
          if (messageId === attrs.afFieldWrap) {
            attrs['$' + (errors.length ? 'add' : 'remove') + 'Class']('has-error');
            if (afSubmitCtrl.showSuccess) {
              attrs['$' + (errors.length ? 'remove' : 'add') + 'Class']('has-success');
            }
          }
        });
      }
    };
  });
