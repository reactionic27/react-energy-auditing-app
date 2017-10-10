import React from 'react'
import moment from 'moment';

export default class Formatter {

  constructor(val) {
    this._val = val;
    this._prefix = '';
    this._suffix = '';
    this._fallback = '';
    this._moment = null
  }

  csp() {
    this._suffix += ', '
    return this;
  }

  sp() {
    this._suffix += ' ';
    return this;
  }

  br() {
    this._br = true
    return this;
  }

  email() {
    this._email = true;
    return this;
  }

  else(fallback) {
    this._fallback = fallback;
    return this;
  }

  prefix(val) {
    this._prefix = val;
    return this;
  }

  suffix(val) {
    this._suffix = val;
    return this;
  }

  moment(fmt) {
    this._moment = fmt
    return this;
  }

  toString() {
    if (!this._val) {
      return this._fallback;
    }
    if (this._moment) {
      return this._prefix + moment(this._val).format(this._moment) + this._suffix
    }
    return this._prefix + this._val + this._suffix;
  }

  asChild() {
    if (this._val === null || this._val === undefined) return null;
    if (this._br && this._val !== '') {
      return [this.toString(), <br key={2} />]
    }
    if (this._sp && this._val !== '') {
      return [this.toString(), '&nbsp;']
    }
    return this.toString();
  }

}

['d', 'specialCeil'].forEach(method => {
  Formatter.prototype[method] = function(...args) {
    var Value = require('./value').Value
    return new Value(this._val).prefix(this._prefix).suffix(this._suffix)[method](...args)
  }
})
