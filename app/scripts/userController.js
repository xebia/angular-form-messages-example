angular.module('angularFormMessagesExample').controller('UserController', function ($q, $scope, $timeout) {
  $scope.user = {};

  $scope.afterSubmit = function () {
    return $timeout(function () {
      return $q.reject({
        validation: {
          'user.personalinfo': [{ message: 'There is something wrong with the personal information', type: 'error' }],
          address: [{ message: 'Cannot locate address geo', type: 'error' }],
          'user.name': [{ message: 'User name server side error', type: 'error' }],
          'user.email': [
            { message: 'User email server side error', type: 'error' },
            { message: 'User email server side error 2', type: 'error' }
          ]
        }
      });
    }, 2000);
  };
});
