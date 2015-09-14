angular.module('angularFormMessagesExample').controller('UserController', function ($q, $scope, $timeout) {
  $scope.repeatingUser = {
    name: 'Frank',
    friends: [{}, {}]
  };
  $scope.customUser = {
    food: { Meat: true }
  };
  $scope.food = ['Meat', 'Fish', 'Vegetarian'];

  $scope.newFriend = function () {
    $scope.repeatingUser.friends.push({});
  };
  $scope.removeFriend = function (i) {
    $scope.repeatingUser.friends.splice(i, 1);
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

  $scope.submitRepeating = function () {
    return $timeout(function () {
      return $q.reject({
        validation: {
          friendsForm1: {
            'friend.name': [{ message: 'Friend 2 has a wrong name', type: 'ERROR' }]
          }
        }
      });
    }, 1000);
  };

  $scope.submitCustom = function () {
    return $timeout(function () {
      return $q.reject({
        validation: {
          customForm: {
            'user.food': [{ message: 'Sorry, this food is not available', type: 'ERROR' }]
          }
        }
      });
    }, 1000);
  };
});
