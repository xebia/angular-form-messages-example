angular.module('angularFormMessagesExample').controller('UserController', function ($q, $scope) {
  $scope.user = {};

  $scope.afterSubmit = function () {
    return $q.reject({
      validation: {
        address: ['Cannot locate address geo'],
        'user.name': ['User name server side error'],
        'user.email': [
          'User email server side error',
          'User email server side error 2'
        ]
      }
    });
  };
});
