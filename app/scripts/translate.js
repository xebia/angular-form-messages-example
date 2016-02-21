/**
 * A simple translate filter and directive for showing messages.
 * It has the same API as Pascal Precht's $translate
 */
angular.module('angularFormMessagesExample')
  .factory('$translate', function ($q) {
    var translations = {
      'reusable.email.email': 'Please fill in an e-mail address (general error)',
      'userForm.user.email.email': 'Please fill in an e-mail address',
      'userForm.user.required': 'There is a required field that is empty',
      date: 'Please fill in a valid date',
      period: 'The "from" date must be before the "to" date',
      required: 'This field is required'
    };

    return function (key) {
      return key in translations ? $q.resolve(translations[key]) : $q.reject(key);
    };
  })
  .directive('translate', function (
    $translate
  ) {
    return {
      restrict: 'A',
      link: function ($scope, elem, attr) {
        function translate(translation) {
          elem.html(translation);
        }
        $translate(attr.translate)
          .then(translate)
          .catch(translate);
      }
    };
  });
