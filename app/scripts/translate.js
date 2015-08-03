/**
 * A simple translate filter and directive for showing messages
 */
angular.module('angularFormMessagesExample')
  .filter('translate', function () {
    var translations = {
      email: 'Please fill in an e-mail address',
      date: 'Please fill in a valid date',
      period: 'The "from" date must be before the "to" date',
      required: 'This field is required'
    };

    return function (key) {
      return key in translations ? translations[key] : key;
    };
  })
  .directive('translate', function (translateFilter) {
    return {
      restrict: 'A',
      link: function ($scope, elem, attr) {
        elem.html(translateFilter(attr.translate));
      }
    };
  });
