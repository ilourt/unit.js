/**
 * This file is part of the Unit.js testing framework.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 *
 * For the full copyright and license information, please view
 * the LICENSE file distributed with this source code
 * or visit http://unitjs.com.
 *
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 */

'use strict';

var _             = require('lodash');

// constructor
var RawControlFlow  = require('../control-flow');

// object
var rawAssertions = require('../assertions');

/**
 * Expose all assertions
 * @type {function}
 * @param  {mixed} actual Actual value tested
 * @return {Object}        The current asserter
 */
module.exports = function BoolAsserter(actual) {

  // actual value tested
  this.actual = actual;

  // assertions with the current context
  var assertions = rawAssertions.call(this, actual);

  // Build the common API with the current context
  var ControlFlow = RawControlFlow.bind(this);
  var commonApi = new ControlFlow();

  // provides the common API in the current asserter
  for (var method in commonApi) {
    this[method] = commonApi[method];
  }

  // assert the type
  assertions.isBool(this.actual);

  // provides the assertions to the current asserter
  var useAssertions = ['isTrue', 'isNotTrue', 'isFalse', 'isNotFalse'];
  var asserterAssertions = _.pick(assertions, useAssertions);

  for (var method in asserterAssertions) {
    this[method] = asserterAssertions[method];
  }

  // return this asserter
  return this;
};