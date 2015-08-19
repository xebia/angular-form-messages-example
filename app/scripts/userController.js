angular.module('angularFormMessagesExample').controller('UserController', function ($q, $scope, $timeout) {
  $scope.user = {};
  $scope.complexUser = {
    name: 'Frank',
    food: { Meat: true },
    friends: [{}, {}]
  };
  $scope.food = ['Meat', 'Fish', 'Vegetarian'];

  $scope.newFriend = function () {
    $scope.complexUser.friends.push({});
  };

  $scope.afterSubmit = function () {
    return $timeout(function () {
      return $q.reject({
        validation: {
          userForm: {
            'user.name': [{ message: 'User name server side info', type: 'INFO' }],
            'user.email': [
              { message: 'User email server side warning', type: 'WARNING' },
              { message: 'User email server side error', type: 'ERROR' }
            ]
          }
        }
      });
    }, 2000);
  };

  $scope.afterSubmitComplex = function () {
    return $timeout(function () {
      return $q.reject({
        validation: {
          complexUserForm: {
            'user.personalinfo': [{ message: 'There is something wrong with the personal information', type: 'ERROR' }],
            address: [{ message: 'Cannot locate address geo', type: 'ERROR' }],
            'user.gender': [{ message: 'Gender server side success', type: 'SUCCESS' }],
            'user.name': [{ message: 'User name server side info', type: 'INFO' }],
            'user.email': [
              { message: 'User email server side error', type: 'ERROR' },
              { message: 'User email server side warning', type: 'WARNING' }
            ]
          },
          friendsForm1: {
            'friend.name': [{ message: 'Friend 2 has a wrong name', type: 'ERROR' }]
          }
        }
      });
    }, 2000);
  };
});
