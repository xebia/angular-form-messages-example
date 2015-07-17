angular.module('angularFormMessagesExample')
  .factory('DateUtils', function () {
    return {
      isDate: function (dateString) {
        return (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/).test(dateString);
      }
    };
  });
