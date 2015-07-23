angular.module('angularFormMessagesExample')
  .directive('fieldState', function (
    MESSAGE_TYPES
  ) {
    return {
      require: '^afSubmit',
      link: function ($scope, elem, attrs, afSubmitCtrl) {

        $scope.$on('validation', function onValidation(event, messageId, messages, messageType) {
          if (messageId === attrs.afFieldWrap) {
            angular.forEach(MESSAGE_TYPES, function (type) {
              attrs.$removeClass('has-' + type.toLowerCase());
            });
            attrs.$removeClass('has-feedback');

            if (messageType) {
              attrs.$addClass('has-' + messageType.toLowerCase());
              attrs.$addClass('has-feedback');
            } else if (afSubmitCtrl.showSuccess) {
              attrs.$addClass('has-success');
              attrs.$addClass('has-feedback');
            }
          }
        });
      }
    };
  });
