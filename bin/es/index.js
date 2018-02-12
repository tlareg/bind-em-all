function bindSingle(context, methodName) {
  if (!methodName || typeof methodName !== 'string') {
    throw new TypeError("bindEmAll expect method name: \"" + methodName + "\" to be truthy string");
  }

  if (typeof context[methodName] !== 'function') {
    throw new Error("bindEmAll expect \"" + methodName + "\" to be method on given " + ("context (context constructor name: \"" + context.constructor.name + "\")"));
  } // eslint-disable-next-line no-param-reassign


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


export default function bindEmAll(context, methods) {
  if (!context || typeof context !== 'object') {
    throw new TypeError('bindEmAll expect argument "context" to be truthy object');
  }

  var methodsArgType = typeof methods;

  if (!methods || methodsArgType !== 'string' && !Array.isArray(methods)) {
    throw new TypeError('bindEmAll expect argument "methods" to be truthy string or array of truthy strings');
  }

  var methodsArr = methodsArgType === 'string' ? methods.split(/\s+/).map(function (n) {
    return n.trim();
  }).filter(function (n) {
    return !!n;
  }) : methods;
  methodsArr.forEach(function (n) {
    return bindSingle(context, n);
  });
  return context;
}