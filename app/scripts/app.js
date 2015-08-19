angular
  .module('angularFormMessagesExample', ['ngMessages', 'angularFormMessagesBootstrap'])
  .config(function (AfMessageServiceProvider, SHOW_MULTIPLE) {
    AfMessageServiceProvider.setShowMultiple(SHOW_MULTIPLE.ALL);
  });
