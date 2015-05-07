angular.module('angularFormMessagesExample').controller('UserController', function ($q, $scope) {
  $scope.user = {};

  $scope.afterSubmit = function () {
    return $q.reject({
      validation: {
        address: [{ message: 'Cannot locate address geo', code: 'geoFailed' }],
        'user.name': [{ message: 'User name server side error', code: 'alreadyTaken' }],
        'user.email': [
          { message: 'User email server side error', code: 'invalidEmail' },
          { message: 'User email server side error 2', code: 'duplicateEmail' }
        ]
      }
    });
  };
});
