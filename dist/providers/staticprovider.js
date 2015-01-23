"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _get = function get(object, property, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

var _inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) subClass.__proto__ = superClass;
};

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var BasicProvider = _interopRequire(require("./basicprovider"));

/**
 * Static Provider
 */
var StaticProvider = (function (BasicProvider) {
  function StaticProvider(container, resource) {
    var options = arguments[2] === undefined ? {} : arguments[2];
    _get(Object.getPrototypeOf(StaticProvider.prototype), "constructor", this).call(this, container, resource, options);
  }

  _inherits(StaticProvider, BasicProvider);

  _prototypeProperties(StaticProvider, null, {
    get: {

      /**
       * Provides the registered resource without any manipulation.
       *
       * @return {Promise}
       * @api public
       */
      value: function get() {
        var _this = this;
        return new Promise(function (resolve) {
          return resolve(_this.resource);
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return StaticProvider;
})(BasicProvider);

module.exports = StaticProvider;