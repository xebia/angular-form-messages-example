angular.module('angularFormMessagesExample')
  .directive('tableOfContents', function ($route) {
    return {
      template: '<ul class="list-inline"><li ng-repeat="(route, config) in routes" ng-if="!(($index % 2) || $last)"><a ng-href="#{{route}}">{{config.name}}</a></li></ul>',
      link: function ($scope) {
        $scope.routes = $route.routes;
      }
    };
  });
