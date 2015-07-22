angular.module('angularFormMessagesExample')
  .directive('fieldState', function (
    MESSAGE_TYPES,
    MessageService
  ) {
    return {
      require: '^afSubmit',
      link: function ($scope, elem, attrs, afSubmitCtrl) {

        $scope.$on('validation', function onValidation(event, messageId, messages) {
          if (messageId === attrs.afFieldWrap) {
            angular.forEach(MESSAGE_TYPES, function (type) {
              attrs.$removeClass('has-' + type.toLowerCase());
            });

            if (messages.length) {
              attrs.$addClass('has-' + MessageService.determineMessageType(messages).toLowerCase());
            } else if (afSubmitCtrl.showSuccess) {
              attrs.$addClass('has-success');
            }
          }
        });
      }
    };
  });
