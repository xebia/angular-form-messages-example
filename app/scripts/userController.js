angular.module('angularFormMessagesExample').controller('UserController', function ($q, $scope, $timeout) {
  $scope.user = {
    name: 'Frank',
    food: { Meat: true }
  };
  $scope.food = ['Meat', 'Fish', 'Vegetarian'];
  $scope.friends = [{}];

  $scope.newFriend = function () {
    $scope.friends.push({});
  };

  $scope.afterSubmit = function () {
    return $timeout(function () {
      return $q.reject({
        validation: {
          userForm: {
            'user.personalinfo': [{ message: 'There is something wrong with the personal information', type: 'ERROR' }],
            address: [{ message: 'Cannot locate address geo', type: 'ERROR' }],
            'user.gender': [{ message: 'Gender server side success', type: 'SUCCESS' }],
            'user.name': [{ message: 'User name server side info', type: 'INFO' }],
            'user.email': [
              { message: 'User email server side error', type: 'ERROR' },
              { message: 'User email server side warning', type: 'WARNING' }
            ]
          }
        }
      });
    }, 2000);
  };
});
