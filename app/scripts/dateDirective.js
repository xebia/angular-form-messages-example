angular.module('angularFormMessagesExample')
  .directive('date', function () {
    return {
      require: ['ngModel', '^form'],
      scope: {
        date: '=ngModel' // Date
      },
      templateUrl: 'scripts/dateDirective.html',
      link: function ($scope, elem, attrs, ctrls) {
        function setDate(newVal) {
          if (newVal[0] === undefined && newVal[1] === undefined && newVal[2] === undefined) {
            $scope.date = undefined;
            return;
          }
          var isValid = true;
          if (newVal[0] === undefined || newVal[1] === undefined || newVal[2] === undefined) {
            isValid = false;
          } else {
            var newDate = moment({ year: $scope.year, month: $scope.month, date: $scope.day });
            isValid = newDate.isValid();
            $scope.date = isValid ? newDate.format('YYYY-MM-DD') : undefined;
          }

          modelCtrl.$setValidity('wrongDate', isValid);
        }

        var modelCtrl = ctrls[0];
        var formCtrl = ctrls[1];

        $scope[formCtrl.$name] = formCtrl;

        $scope.$watch('date', function (newVal) {
          if (newVal === undefined) { return; }

          newVal = moment(newVal);
          $scope.year = newVal.year();
          $scope.month = newVal.month();
          $scope.day = newVal.date();
        });

        $scope.$watchCollection('[day, month, year]', setDate);
      }
    };
  });