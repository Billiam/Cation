
/**
 * Basic Provider.
 * Intended as an Abstract Class. All providers must extend from this.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BasicProvider = function BasicProvider(container, id, resource) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  _classCallCheck(this, BasicProvider);

  if (!container || container.constructor.name !== 'Cation') {
    throw new Error('Invalid container instance');
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

  this.container = container;
  this.id = id;
  this.resource = resource;
  this.options = options;
};

exports['default'] = BasicProvider;
module.exports = exports['default'];