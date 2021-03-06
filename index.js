/**
 * verbalize <https://github.com/jonschlinkert/verbalize>
 * A lightweight logging library.
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');


/**
 * General log
 *
 * @api public
 * @return {string}
 */

var log = function () {
  var args = Array.prototype.map.call(arguments, function (arg) {
    return chalk.stripColor(arg);
  });
  args[0] = chalk.bold(args[0]);
  return console.log.apply(this, args);
};


/**
 * Runner, customize with the name of your lib.
 *
 * @api public
 * @return {String}
 */

log.runner = '';


/**
 * Expose verbose logging.
 */

log.mode = {};
log.mode.verbose = false;


/**
 * Style a basic separator
 */

log.sep = chalk.gray('·');


/**
 * Expose chalk
 */

Object.keys(chalk.styles).map(function(color) {
  log[color] = chalk[color];
});


/**
 * Get the current time using `.toLocaleTimeString()`.
 *
 * @api private
 * @return {String}
 */

var time = function() {
  var time = new Date().toLocaleTimeString();
  return chalk.bgBlack.white(time) + ' ';
};


/**
 * Base formatting for special logging.
 *
 * @api private
 * @return {String}
 */

var format = function(color, text) {
  return chalk[color]('  ' + log.runner + ' [' + text + '] ' + log.sep);
};


/**
 * Timestamp
 *
 * @api public
 * @return {string}
 */

log.timestamp = function () {
  var args = arguments;
  args[0] = time() + chalk.gray(args[0]);
  return console.log.apply(this, args);
};


/**
 * Testing some specialized logging formats.
 */

log.subhead = function () {
  var args = arguments;
  args[0] = format('bold', args[0]);
  return console.log.apply(this, args);
};

log.setup = function () {
  var args = arguments;
  args[0] = format('yellow', args[0]);
  return console.log.apply(this, args);
};

log.register = function () {
  var args = arguments;
  args[0] = format('green', args[0]);
  return console.log.apply(this, args);
};

log.run = function () {
  var args = arguments;
  args[0] = format('gray', args[0]);
  return console.log.apply(this, args);
};


/**
 * Write
 *
 * @api public
 * @return {string}
 */

log.write = function () {
  return console.log.apply(this, arguments);
};

log.writeln = function () {
  var args = arguments;
  return console.log.apply('\n' + this, args);
};


/**
 * Info
 *
 * @api public
 * @return {string}
 */

log.info = function () {
  var args = arguments;
  args[0] = chalk.cyan(args[0]);
  return console.log.apply(this, args);
};

/**
 * Success
 *
 * @api public
 * @return {string}
 */

log.success = function () {
  var args = arguments;
  args[0] = chalk.green(args[0]);
  return console.log.apply(this, args);
};


/**
 * Done.
 *
 * @api public
 * @return {string}
 */

log.done = function () {
  var args = arguments;
  args[0] = (chalk.green('  ' + log.runner + ' [' + args[0] + ']'));
  return console.log.apply(this, args);
};


/**
 * Warn
 *
 * @api public
 * @return {string}
 */

log.warn = function () {
  var args = arguments;
  args[0] = chalk.yellow(args[0]);
  return console.warn.apply(this, args);
};


/**
 * Error
 *
 * @api public
 * @return {string}
 */

log.error = function () {
  var args = arguments;
  args[0] = chalk.red(args[0]);
  return console.error.apply(this, args);
};


/**
 * Fatal
 *
 * @api public
 * @return {string}
 */

log.fatal = function () {
  var args = arguments;
  args[0] = (chalk.red('  ' + log.runner + ' [FAIL]:') + chalk.gray(' · ') + args[0]);
  console.log();
  console.log.apply(this, args);
  process.exit(1);
};


/**
 * Expose all properties on the `log` object
 * to `verbose` mode.
 */

log.verbose = {};

Object.keys(log).filter(function(key) {
  return typeof log[key] === 'function';
}).forEach(function(key) {
  log.verbose[key] = function() {
    if(log.mode.verbose !== false) {
      log[key].apply(log, arguments);
      return log.verbose;
    } else {
      return;
    }
  };
});


module.exports = log;