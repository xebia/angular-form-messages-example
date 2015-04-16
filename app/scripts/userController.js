angular.module('angularFormMessagesExample').controller('UserController', function ($q, $scope) {
  $scope.user = {};

  $scope.afterSubmit = function () {
    return $q.reject({
      validation: {
        'OMGWTF': { message: 'OMGWTF geen error', isValid: false },
        'user.name': { message: 'User name server side error', isValid: false }
      }
    });
  };
});