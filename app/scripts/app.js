angular
  .module('angularFormMessagesExample', ['ngRoute', 'ngMessages', 'angularFormMessagesBootstrap'])
  .config(function (AfMessageServiceProvider, SHOW_MULTIPLE) {
    AfMessageServiceProvider.setShowMultiple(SHOW_MULTIPLE.ALL);
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/simple', { templateUrl: 'examples/simple.html', name: 'Simple form' })
      .when('/triggers', { templateUrl: 'examples/triggers.html', name: 'Triggers setting' })
      .when('/complex', { templateUrl: 'examples/complex.html', name: 'Complex form' })
    ;
  });
