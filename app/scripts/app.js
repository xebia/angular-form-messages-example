angular
  .module('angularFormMessagesExample', ['ngRoute', 'ngMessages', 'angularFormMessagesBootstrap'])
  .config(function (AfMessageServiceProvider, SHOW_MULTIPLE) {
    AfMessageServiceProvider.setShowMultiple(SHOW_MULTIPLE.ALL);
    AfMessageServiceProvider.setValidatorLabelPrefix('reusable');
    AfMessageServiceProvider.setFieldValidatorLabelPrefix('reusable');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/simple', { templateUrl: 'examples/simple.html', name: 'Simple form' })
      .when('/feedback', { templateUrl: 'examples/feedback.html', name: 'Feedback icons' })
      .when('/show-success', { templateUrl: 'examples/showSuccess.html', name: 'Show success' })
      .when('/triggers', { templateUrl: 'examples/triggers.html', name: 'Triggers setting' })
      .when('/repeating-fields', { templateUrl: 'examples/repeatingFields.html', name: 'Repeating fields' })
      .when('/custom', { templateUrl: 'examples/customDirectives.html', name: 'Custom directives' })
      .when('/reusable', { templateUrl: 'examples/reusable.html', name: 'Reusable errors' })
      .otherwise('/simple');
  });
