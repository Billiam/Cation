'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _basicprovider = require('./basicprovider');

var _basicprovider2 = _interopRequireDefault(_basicprovider);

var _helpersService = require('../helpers/service');

var util = _interopRequireWildcard(_helpersService);

/**
 * Service Provider
 */

var ServiceProvider = (function (_BasicProvider) {
  _inherits(ServiceProvider, _BasicProvider);

  function ServiceProvider(container, id, resource) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, ServiceProvider);

    _get(Object.getPrototypeOf(ServiceProvider.prototype), 'constructor', this).call(this, container, id, resource, options);
  }

  /**
   * Provides a new instance of the registered resource.
   *
   * @return {Promise}
   * @api public
   */

  _createClass(ServiceProvider, [{
    key: 'get',
    value: function get() {
      var _this = this;

      // resolve arguments
      var serviceDepsPromise = util.resolveDependencies(this.container, this.options.args);

      return serviceDepsPromise.then(function (serviceDeps) {
        serviceDeps.unshift(_this.resource);

        var Resource = _this.resource.bind.apply(_this.resource, serviceDeps);

        // bubble a new Promise
        return new Resource();
      });
    }
  }]);

  return ServiceProvider;
})(_basicprovider2['default']);

exports['default'] = ServiceProvider;
module.exports = exports['default'];