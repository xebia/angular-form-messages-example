/**
 * A simple translate filter and directive for showing messages
 */
angular.module('angularFormMessagesExample')
  .filter('translate', function (
    TranslateService
  ) {
    return function (key) {
      var translation = TranslateService.getLabel(key);
      return translation === undefined ? key : translation;
    };
  })
  .factory('TranslateService', function () {
    var translations = {
      'userForm.user.email.email': 'Please fill in an e-mail address',
      date: 'Please fill in a valid date',
      period: 'The "from" date must be before the "to" date',
      required: 'This field is required'
    };

    return {
      getLabel: function (key) {
        return translations[key];
      },
      hasLabel: function (key) {
        return key in translations;
      }
    };
  })
  .directive('translate', function (
    translateFilter
  ) {
    return {
      restrict: 'A',
      link: function ($scope, elem, attr) {
        elem.html(translateFilter(attr.translate));
      }
    };
  });
