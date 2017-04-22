'use strict';

window.globalNamespace = window.globalNamespace || {};

window.globalNamespace.pubSub = (function() {
  function PubSub() {
    var topics = {};

    this.publish = function() {
      if (arguments.length === 0) {
        throw new Error('Missing Event Name parameter to publish an event');
      }

      var parameters = Array.prototype.slice.call(arguments);
      var topicName = parameters.shift();

      if (!topics[topicName]) {
        return false;
      }

      for (var i = 0; i < topics[topicName].length; i++) {
        if (typeof topics[topicName][i] === 'function') {
          topics[topicName][i].apply(null, parameters);
        }
      }

      return true;
    };

    this.subscribe = function(topicName, handler) {
      if (!topicName) {
        throw new Error('Missing Event Name parameter to subscribe to an event');
      }

      if (!topics[topicName]) {
        topics[topicName] = [];
      }

      var handlerIndex = topics[topicName].indexOf(handler);

      if (handlerIndex < 0) {
        handlerIndex = topics[topicName].push(handler) - 1;
      }

      return getRevokeObject(topicName, handlerIndex);
    };

    function getRevokeObject(topicName, handlerIndex) {
      return {
        revoke: function() {
          topics[topicName][handlerIndex] = null;
        }
      };
    }
  }

  return new PubSub();
})();
