/**
 *  Formatting functions as an alternative to model.get()
 *  Includes prefixes, suffixes, muliplication, precision, fallback and others
 *  This is intended for number-like values, not strings of text
 *  Chained syntax requires ending with either .toString or .toNumber()
 *  Ex: product.val('rate').times(100).suffix('%').else('0').toString()
 *  If you just want the value, use product.get('rate')
 *  Reqired terminators to string:
 *  .toString()
 *  .toNumber()
 *  .toDate()      // Returns a string formated as a nice date and/or time
 */

import toNumber from './toNumber'
import moment from 'moment'
import _ from 'lodash'
import numberFormat from './numberFormat';
var defaultFallback = 'N/A'
var defaultDateFormat = 'MMM DD, YYYY'
import Formatter from './formatter'

moment.updateLocale('en', {
  calendar : {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : 'ddd D MMM, YYYY',
    nextWeek : 'ddd D MMM, YYYY',
    sameElse : 'ddd D MMM, YYYY'
  }
})

export class Value extends Formatter {

  constructor() {
    super(...arguments)
    this._operations = [];
  }

  absVal(bool) {
    this._abs = bool
    return this;
  }

  d(n) {
    this._decimals = n;
    return this;
  }

  decimals(n) {
    return this.d(n)
  }

  x(n) {
    this._operations.push(['times', n]);
    return this;
  }

  times(n) {
    this._operations.push(['times', n]);
    return this;
  }

  divide(n) {
    this._operations.push(['divide', n]);
    return this;
  }

  prefix(str) {
    this._prefix = str;
    return this;
  }

  suffix(str) {
    this._suffix = str;
    return this;
  }

  noComma(bool) {
    this._noComma = bool ? true : false;
    return this;
  }

  specialCeil() {
    this._specialCeil = true;
    return this;
  }

  dateFormat(format) {
    this._dateFormat = format || defaultDateFormat;
    return this;
  }

  // Special rounding down. Rounds to more significant digits the bigger the value is.
  _calculateSpecialFloor(val, places) {
    places = places ? places : -1;
    var original_val = val || 0;
    var sign = val < 0 ? -1 : 1;
    val = Math.abs(val);
    var power = Math.pow(10, parseInt(places, 10));
    val = ((Math.floor(val * power)) / power) * sign;

    // If the number is between 0 and 10, just return the number
    if (val === 0 && original_val < 10) {
      return parseInt(original_val, 10);
    }
    return val;
  }

  _calculateSpecialCeil(val, places) {
    places = places ? places : -2;
    var sign = val < 0 ? -1 : 1;
    val = Math.abs(val);
    var power = Math.pow(10, parseInt(places, 10));
    return ((Math.ceil(val * power)) / power) * sign;
  }

  // multiple & divide
  _operate(n) {
    var output = n;
    _.each(this._operations, function(operation) {
      switch (operation[0]) {
        case 'times':
          output = output * operation[1];
          break;
        case 'divide':
          output = output / operation[1];
          break;
        default:
          throw new Error();
      }
    })
    return output;
  }

  // Determine number of decimals of a number.
  _decimalPlaces(n) {
    var match = ('' + n).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    // arg 2: (Number of digits right of decimal point) - (Adjust for scientific notation)
    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  }

  // Before outputing to a number or string, do operations that are common to both
  _common(n) {
    var output = n;

    // Do multiplication and division operations
    output = this._operations.length ? this._operate(output) : output;

    // special ceil function
    output = this._specialCeil ? this._calculateSpecialCeil(output) : output

    // Take absolute value
    output = this._abs ? Math.abs(output) : output;

    return output;
  }

  /**
  * Exiting the chain requires .toNumber() or .toString()
  * if calling string functions like suffix and prefix with .toNumber() it throws an error
  */
  toNumber() {
    //If it's a string, strip commas out and coerce it to a number
    var output = _.isString(this._val) ? +(this._val.replace(',', '')) : this._val
    var fallback = this._fallback || this._fallback === 0 ? this._fallback : defaultFallback

    if (!output && output !== 0) return fallback
    if (this._suffix || this._prefix) { throw new Error('Cannot supply a suffix or prefix when calling .toNumber()') }
    if (this._dateFormat) throw new Error('Terminate chain with .toDate() if using .datetime()')

    // Run common operations on the values before outputting as a string
    output = this._common(output);

    // If decimals are specified, use those. Otherwise output with existing decimals
    return (this._decimals || this._decimals === 0) ? toNumber(output, this._decimals) : +output;
  }

  toString() {
    //If it's a string, strip commas out and coerce it to a number
    var output = _.isString(this._val) ? +(this._val.replace(',', '')) : this._val
    var fallback = this._fallback || this._fallback === 0 ? this._fallback : defaultFallback

    if (!output && output !== 0) return fallback
    if (this._dateFormat) throw new Error('Terminate chain with .toDate() if using .time()')

    // If decimals aren't specified, detect number of decimals on existing number
    var decimals = (this._decimals || this._decimals === 0) ? this._decimals : this._decimalPlaces(output);

    // Run common operations on the values before outputting as a string
    output = this._common(output);

    // Add commas as thousands separator if it's a number:
    if (this._noComma) {
      output = !!parseFloat(output) ? numberFormat(output, decimals, '.', '') : output;
    } else {
      output = !!parseFloat(output) ? numberFormat(output, decimals) : output;
    }

    // Add any prefixes or suffixes, which also automatically cast it as a string
    output = this._prefix + output + this._suffix;

    return output
  }

}

export default Value;
