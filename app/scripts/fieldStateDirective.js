angular.module('angularFormMessagesExample')
  .directive('fieldState', function () {
    return {
      require: '^afSubmit',
      link: function ($scope, elem, attrs, afSubmitCtrl) {

        // There can be multiple messages. We show the CSS class for the most severy message
        function determineMessageType(messages) {
          var severityIndex = 0;
          angular.forEach(messages, function (message) {
            var index = messageTypes.indexOf(message.type);
            if (index > severityIndex) {
              severityIndex = index;
            }
          });
          return messageTypes[severityIndex];
        }

        var messageTypes = ['success', 'info', 'warning', 'error'];

        $scope.$on('validation', function onValidation(event, messageId, messages) {
          if (messageId === attrs.afFieldWrap) {
            angular.forEach(messageTypes, function (type) {
              attrs.$removeClass('has-' + type);
            });

            if (messages.length) {
              attrs.$addClass('has-' + determineMessageType(messages));
            } else if (afSubmitCtrl.showSuccess) {
              attrs.$addClass('has-success');
            }
          }
        });
      }
    };
  });
