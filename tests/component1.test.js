/* global test, require, jest, expect */

'use strict';

require('../src/pubsub');
require('../src/rest-client');
require('../src/component1');

var fs = require('fs');
document.body.innerHTML = fs.readFileSync('tests/resources/component1/component1.html', 'utf-8');

test('dependencies should be defined', function() {
  expect(window.globalNamespace.pubSub).toBeDefined();
  expect(window.globalNamespace.restClient).toBeDefined();
});

test('should execute respond to a published event and perform a xhr to get component content', function() {
  //setup
  var responseContent = fs.readFileSync('tests/resources/component1/component1-response1.html', 'utf-8');
  var componentUpdateSubscriber = jest.fn(function() {
    executeExpects();
  });

  window.globalNamespace.restClient.request = jest.fn(function(config) {
    config.callback(responseContent);
  });
  window.globalNamespace.pubSub.subscribe('component1.updated', componentUpdateSubscriber);

  var button = window.document.querySelector('#trigger');
  button.addEventListener('click', function() {
    window.globalNamespace.pubSub.publish('component1.load');
  });

  // test
  button.click();

  //assets
  function executeExpects() {
    expect(document.querySelectorAll('[data-place-holder]')[0].innerHTML).toEqual(responseContent);
    expect(window.globalNamespace.restClient.request).toHaveBeenCalled();
    expect(componentUpdateSubscriber).toHaveBeenCalled();
  }

});
