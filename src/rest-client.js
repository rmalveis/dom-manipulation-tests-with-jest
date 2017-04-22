'use strict';

window.globalNamespace = window.globalNamespace || {};

window.globalNamespace.restClient = (function() {
  function RestClient() {

    this.request = function(config) {
      //sample code just to test
      if (!config.callback) {
        throw new Error('A Callback must be given');
      }

      window.setTimeout(function() {
        config.callback.apply(this, '');
      }, 10000);
    };
  }

  var restClient = new RestClient();
  if (window.globalNamespace.pubSub) {
    window.globalNamespace.pubSub.subscribe('restClient.request', restClient.request);
  }
  return restClient;
})();