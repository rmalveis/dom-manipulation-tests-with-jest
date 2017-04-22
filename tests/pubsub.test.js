/* global test, require, jest, expect */

'use strict';

require('../src/pubsub');

test('pubsub should subscribe a listener and call it when its event is published', function() {
  var mockHandler = jest.fn();
  window.globalNamespace.pubSub.subscribe('event1', mockHandler);
  window.globalNamespace.pubSub.publish('event1');

  expect(mockHandler).toHaveBeenCalled();
});

test('pubsub should call subscriber with published payload if any', function() {
  var mockHandler = jest.fn();
  window.globalNamespace.pubSub.subscribe('event1', mockHandler);
  window.globalNamespace.pubSub.publish('event1', {
    payload: true
  });

  expect(mockHandler).toHaveBeenCalled();
  expect(mockHandler).toHaveBeenCalledWith({
    payload: true
  });
});

test('pubsub should call subscriber once even if it registered itself more times', function() {
  var mockHandler = jest.fn();
  window.globalNamespace.pubSub.subscribe('event1', mockHandler);
  window.globalNamespace.pubSub.subscribe('event1', mockHandler);
  window.globalNamespace.pubSub.publish('event1');

  expect(mockHandler).toHaveBeenCalledTimes(1);
});

test('pubsub should revoke subscription correctly when revoke method is called', function() {
  var mockHandler = jest.fn();
  var revoker = window.globalNamespace.pubSub.subscribe('event1', mockHandler);
  revoker.revoke();
  window.globalNamespace.pubSub.publish('event1');

  expect(mockHandler).not.toHaveBeenCalled();
});

test('pubsub should throw error when no topicName is given', function() {
  expect(window.globalNamespace.pubSub.subscribe).toThrow('Missing Event Name parameter to subscribe to an event');
  expect(window.globalNamespace.pubSub.publish).toThrow('Missing Event Name parameter to publish an even');
});

test('pubsub should return false when a publish attempt is made but no subscriber is registered', function() {
  expect(window.globalNamespace.pubSub.publish('event')).toEqual(false);
});

