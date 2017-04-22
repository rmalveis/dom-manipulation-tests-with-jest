'use strict';

window.globalNamespace = window.globalNamespace || {};

window.globalNamespace.component1 = (function() {

  function requestCallback(content) {
    var placeHolders = window.document.querySelectorAll('[data-place-holder]');

    for (var i = 0; i < placeHolders.length; i++) {
      placeHolders[i].innerHtml = content;
    }

    window.globalNamespace.pubSub.publish('component1.updated');
  }

  function makeRequest() {
    window.globalNamespace.restClient.request({
      callback: requestCallback
    });
  }

  if (window.globalNamespace.pubSub) {
    window.globalNamespace.pubSub.subscribe('component1.load', makeRequest);
  }
})();