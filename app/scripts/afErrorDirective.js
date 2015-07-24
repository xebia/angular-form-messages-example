angular.module('angularFormMessagesExample')
  .directive('afError', function () {
    return {
      restrict: 'A',
      templateUrl: 'templates/afError.html'
    };
  });
