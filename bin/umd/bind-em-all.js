(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.bindEmAll = {})));
}(this, (function (exports) { 'use strict';

function bindSingle(context, methodName) {
  if (!methodName || typeof methodName !== 'string') {
    throw new TypeError(`bindEmAll expect method name: "${methodName}" to be truthy string`);
  }

  if (typeof context[methodName] !== 'function') {
    throw new Error(`bindEmAll expect "${methodName}" to be method on given ` + `context (context constructor name: "${context.constructor.name}")`);
  }

  // eslint-disable-next-line no-param-reassign
  context[methodName] = context[methodName].bind(context);
}

/**
 * Binds methods to given context.
 *
 * @param {Object} context - The context that will be bound to given methods.
 * @param {string[]|string} methods - The names of given context methods,
 * that will be bound with context.
 *
 * @returns {Object} context
 */
function bindEmAll(context, methods) {
  if (!context || typeof context !== 'object') {
    throw new TypeError('bindEmAll expect argument "context" to be truthy object');
  }

  const methodsArgType = typeof methods;
  if (!methods || methodsArgType !== 'string' && !Array.isArray(methods)) {
    throw new TypeError('bindEmAll expect argument "methods" to be truthy string or array of truthy strings');
  }

  const methodsArr = methodsArgType === 'string' ? methods.split(/\s+/).map(n => n.trim()).filter(n => !!n) : methods;

  methodsArr.forEach(n => bindSingle(context, n));

  return context;
}

exports.default = bindEmAll;

Object.defineProperty(exports, '__esModule', { value: true });

})));
