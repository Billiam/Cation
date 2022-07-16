/*! Module dependencies */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _providersBasicprovider = require('./providers/basicprovider');

var _providersBasicprovider2 = _interopRequireDefault(_providersBasicprovider);

var _providersServiceprovider = require('./providers/serviceprovider');

var _providersServiceprovider2 = _interopRequireDefault(_providersServiceprovider);

var _providersFactoryprovider = require('./providers/factoryprovider');

var _providersFactoryprovider2 = _interopRequireDefault(_providersFactoryprovider);

var _providersStaticprovider = require('./providers/staticprovider');

var _providersStaticprovider2 = _interopRequireDefault(_providersStaticprovider);

var _helpersDecorator = require('./helpers/decorator');

var decoratorUtils = _interopRequireWildcard(_helpersDecorator);

/*! Private definitions */

/**
 * Container ID.
 * Each container instance can be identified with this ID.
 *
 * @type {String}
 * @api private
 */
var __containerId__ = Symbol();

/**
 * Provider Instances Map.
 * "ResourceID/ProviderInstance" Map object for Resource Providers.
 *
 * @type {Map}
 * @api private
 */
var __providerInstancesMap__ = Symbol();

/**
 * Resource Instances Map.
 * "ResourceID/Instance" Map object for Singletons.
 *
 * @type {Map}
 * @api private
 */
var __resourceInstancesMap__ = Symbol();

/**
 * Provider Constructors Map.
 * "Name/Function" Map object for Providers.
 *
 * @type {Map}
 * @api private
 */
var __providerConstructorsMap__ = Symbol();

/**
 * Decorator Functions Map.
 * "Name/Function" Map object for Decorators.
 *
 * @type {Map}
 * @api private
 */
var __decoratorFunctionsMap__ = Symbol();

/*! ========================================================================= */

/**
 * Cation
 */

var Cation = (function () {
  function Cation() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var id = _ref.id;

    _classCallCheck(this, Cation);

    this[__containerId__] = id;
    this[__providerInstancesMap__] = new Map();
    this[__resourceInstancesMap__] = new Map();
    this[__providerConstructorsMap__] = new Map();
    this[__decoratorFunctionsMap__] = new Map();

    this.addProvider('service', _providersServiceprovider2['default']);
    this.addProvider('factory', _providersFactoryprovider2['default']);
    this.addProvider('static', _providersStaticprovider2['default']);

    this.register('container', this, {
      type: 'static'
    });
  }

  // And here... we... GO.

  /**
   * Gets the container ID.
   *
   * @return {String}
   * @api public
   */

  _createClass(Cation, [{
    key: 'getId',
    value: function getId() {
      return this[__containerId__];
    }

    /**
     * Registers a resource on the container.
     *
     * @param {String}  id        Resource ID. Required.
     * @param {mixed}   resource  The resource to be registered. Required.
     * @param {Object}  options   Object with options. Optional.
     *
     *   Options:
     *     - type: (string) resource type (service, factory, static or a custom type).
     *     - singleton: (boolean) singleton behaviour.
     *     - args: (array) Arguments to be applied to the resource when retrieved (if resource is a function). Optional.
     *     - decorators: (array) ids of already registered decorators. Will be applied in order to the resource, when retrieved.
     *
     * @return {Promise}
     * @api public
     */
  }, {
    key: 'register',
    value: function register(id, resource) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      if (!id) {
        throw new Error('`id` is required');
      }

      if (!resource) {
        throw new Error('`resource` is required');
      }

      if (this.has(id)) {
        throw new Error('There\'s already a resource registered as "' + id + '"');
      }

      if (typeof options.type === 'undefined') {
        options.type = 'service';
      }

      if (typeof options.args === 'undefined') {
        options.args = [];
      }

      if (typeof options.decorators === 'undefined') {
        options.decorators = [];
      }

      if (typeof options.tags === 'undefined') {
        options.tags = [];
      }

      if (!this.hasProvider(options.type)) {
        throw new Error('Unknown type: "' + options.type + '"');
      }

      var Provider = this[__providerConstructorsMap__].get(options.type);

      this[__providerInstancesMap__].set(id, new Provider(this, id, resource, options));
    }

    /**
     * Retrieves a resource from the container.
     *
     * @param {String}  id  Resource ID.
     * @return {Promise}
     * @api public
     */
  }, {
    key: 'get',
    value: function get(id) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.has(id)) {
          return reject(new Error('"' + id + '" resource not found'));
        }

        var provider = _this[__providerInstancesMap__].get(id);
        var isSingleton = provider.options.singleton;

        if (isSingleton && _this.isCached(id)) {
          return resolve(_this[__resourceInstancesMap__].get(id));
        }

        provider.get().then(function (resource) {
          // apply decorators
          var decoratorNames = provider.options.decorators;

          if (!decoratorNames.length) {
            return resource;
          }

          var decoratorFunctions = decoratorNames.map(function (name) {
            if (_this.hasDecorator(name)) {
              return _this[__decoratorFunctionsMap__].get(name);
            }
          });

          if (!decoratorFunctions.length) {
            return resource;
          }

          return decoratorFunctions.reduce(decoratorUtils.reducer, resource);
        }).then(function (resource) {
          // store instance in cache if singleton
          if (isSingleton) {
            _this[__resourceInstancesMap__].set(id, resource);
          }

          return resource;
        }).then(function (resource) {
          return resolve(resource);
        })['catch'](function (error) {
          return reject(error);
        });
      });
    }

    /**
     * Checks if a resource is registered.
     *
     * @param {String}  id  Resource ID
     * @return {Boolean}
     * @api public
     */
  }, {
    key: 'has',
    value: function has(id) {
      if (this[__providerInstancesMap__].has(id)) {
        return true;
      }

      return false;
    }

    /**
     * Removes a resource from the container.
     *
     * @param {String}  id  Resource ID.
     * @api public
     */
  }, {
    key: 'remove',
    value: function remove(id) {
      if (!this.has(id)) {
        return;
      }

      this[__providerInstancesMap__]['delete'](id);
    }

    /**
     * Registers a resource provider.
     *
     * @param {String}   name             Provider name.
     * @param {Function} providerFunction Provider function.
     * @api public
     */
  }, {
    key: 'addProvider',
    value: function addProvider(name, providerFunction) {
      if (this.hasProvider(name)) {
        return;
      }

      var providerConstructorsMap = this[__providerConstructorsMap__];

      providerConstructorsMap.set(name, providerFunction);
    }

    /**
     * Checks if a given provider is registered.
     *
     * @param {String}  name  Provider name.
     * @return {Boolean}
     * @api public
     */
  }, {
    key: 'hasProvider',
    value: function hasProvider(name) {
      return this[__providerConstructorsMap__].has(name);
    }

    /**
     * Removes a given provider.
     *
     * @param {String}  name  Provider name.
     * @api public
     */
  }, {
    key: 'removeProvider',
    value: function removeProvider(name) {
      if (!this.hasProvider(name)) {
        return;
      }

      var providerConstructorsMap = this[__providerConstructorsMap__];

      providerConstructorsMap['delete'](name);
    }

    /**
     * Registers a resource decorator.
     *
     * @param {String}   name               Decorator name.
     * @param {Function} decoratorFunction  Decorator function.
     * @api public
     */
  }, {
    key: 'addDecorator',
    value: function addDecorator(name, decoratorFunction) {
      if (this.hasDecorator(name)) {
        return;
      }

      var decoratorFunctionsMap = this[__decoratorFunctionsMap__];

      decoratorFunctionsMap.set(name, decoratorFunction);
    }

    /**
     * Checks if a given decorator is registered.
     *
     * @param {String}  name  Decorator name.
     * @api public
     */
  }, {
    key: 'hasDecorator',
    value: function hasDecorator(name) {
      return this[__decoratorFunctionsMap__].has(name);
    }

    /**
     * Removes a given decorator.
     *
     * @param {String}  name  Decorator name.
     * @api public
     */
  }, {
    key: 'removeDecorator',
    value: function removeDecorator(name) {
      if (!this.hasDecorator(name)) {
        return;
      }

      var decoratorFunctionsMap = this[__decoratorFunctionsMap__];

      decoratorFunctionsMap['delete'](name);
    }

    /**
     * Checks if a resource is cached.
     * Only instances from services declared as `singleton` will be stored in cache.
     *
     * @param {String}  id  Resource ID.
     * @return {Boolean}
     * @api public
     */
  }, {
    key: 'isCached',
    value: function isCached(id) {
      return this[__resourceInstancesMap__].has(id);
    }

    /**
     * Removes all singleton instances from cache.
     *
     * @api public
     */
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this[__resourceInstancesMap__].clear();
    }

    /**
     * Returns an array of resource IDs for a given tag.
     *
     * @param {String}  tagName  The tag name.
     * @return {Array}
     * @api public
     */
  }, {
    key: 'findTaggedResourceIds',
    value: function findTaggedResourceIds(tagName) {
      var providerInstancesMap = this[__providerInstancesMap__];
      var resourceIds = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = providerInstancesMap.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var resourceId = _step$value[0];
          var provider = _step$value[1];

          if (provider.options.tags.includes(tagName)) {
            resourceIds.push(resourceId);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return resourceIds;
    }
  }]);

  return Cation;
})();

exports['default'] = Cation;
// import Cation from 'cation'
exports.BasicProvider = _providersBasicprovider2['default'];
// import { BasicProvider } from 'cation'
// import Cation, { BasicProvider } from 'cation'