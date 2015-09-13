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

  $scope.submitSimple = function () {
    return $timeout(function () {
      return $q.reject({
        validation: {
          userForm: {
            $messages: [{ message: 'There are errors on the form', type: 'WARNING' }],
            'user.name': [{ message: 'User name server side info', type: 'INFO' }],
            'user.email': [
              { message: 'User email server side warning', type: 'WARNING' },
              { message: 'User email server side error', type: 'ERROR' }
            ]
          }
        }
      });
    }, 1000);
  };

  $scope.submitTrigger = function () {
    return $timeout(function () {
      return $q.reject({
        validation: {
          triggerForm: {
            $messages: [{ message: 'There are errors on the form', type: 'WARNING' }],
            'user.personalinfo': [{ message: 'There is something wrong with the personal information', type: 'ERROR' }],
            'user.name': [{ message: 'User name server side info', type: 'INFO' }],
            'user.email': [
              { message: 'User email server side warning', type: 'WARNING' },
              { message: 'User email server side error', type: 'ERROR' }
            ],
            'user.gender': [{ message: 'Gender server side success', type: 'SUCCESS' }]
          }
        }
      });
    }, 1000);
  };

  $scope.afterSubmitRepeating = function () {
    return $timeout(function () {
      return $q.reject({
        friendsForm1: {
          'friend.name': [{ message: 'Friend 2 has a wrong name', type: 'ERROR' }]
        }
      });
    }, 1000);
  };
});
