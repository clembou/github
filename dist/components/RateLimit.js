(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './Requestable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./Requestable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.Requestable);
    global.RateLimit = mod.exports;
  }
})(this, function (module, _Requestable2) {
  'use strict';

  var _Requestable3 = _interopRequireDefault(_Requestable2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var RateLimit = function (_Requestable) {
    _inherits(RateLimit, _Requestable);

    /**
     * construct a RateLimit
     * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
     * @param {string} [apiBase] - the base Github API URL
     * @return {Promise} - the promise for the http request
     */
    function RateLimit(auth, apiBase) {
      _classCallCheck(this, RateLimit);

      return _possibleConstructorReturn(this, (RateLimit.__proto__ || Object.getPrototypeOf(RateLimit)).call(this, auth, apiBase));
    }

    /**
     * Query the current rate limit
     * @see https://developer.github.com/v3/rate_limit/
     * @param {Requestable.callback} [cb] - will receive the rate-limit data
     * @return {Promise} - the promise for the http request
     */


    _createClass(RateLimit, [{
      key: 'getRateLimit',
      value: function getRateLimit(cb) {
        return this._request('GET', '/rate_limit', null, cb);
      }
    }]);

    return RateLimit;
  }(_Requestable3.default);

  module.exports = RateLimit;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJhdGVMaW1pdC5qcyJdLCJuYW1lcyI6WyJSYXRlTGltaXQiLCJhdXRoIiwiYXBpQmFzZSIsImNiIiwiX3JlcXVlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQVlNQSxTOzs7QUFDSDs7Ozs7O0FBTUEsdUJBQVlDLElBQVosRUFBa0JDLE9BQWxCLEVBQTJCO0FBQUE7O0FBQUEsbUhBQ2xCRCxJQURrQixFQUNaQyxPQURZO0FBRTFCOztBQUVEOzs7Ozs7Ozs7O21DQU1hQyxFLEVBQUk7QUFDZCxlQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLGFBQXJCLEVBQW9DLElBQXBDLEVBQTBDRCxFQUExQyxDQUFQO0FBQ0Y7Ozs7OztBQUdKRSxTQUFPQyxPQUFQLEdBQWlCTixTQUFqQiIsImZpbGUiOiJSYXRlTGltaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVcclxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxyXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxyXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xyXG5cclxuLyoqXHJcbiAqIFJhdGVMaW1pdCBhbGxvd3MgdXNlcnMgdG8gcXVlcnkgdGhlaXIgcmF0ZS1saW1pdCBzdGF0dXNcclxuICovXHJcbmNsYXNzIFJhdGVMaW1pdCBleHRlbmRzIFJlcXVlc3RhYmxlIHtcclxuICAgLyoqXHJcbiAgICAqIGNvbnN0cnVjdCBhIFJhdGVMaW1pdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IGF1dGggLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdEh1YlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2VdIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSkge1xyXG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFF1ZXJ5IHRoZSBjdXJyZW50IHJhdGUgbGltaXRcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JhdGVfbGltaXQvXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJhdGUtbGltaXQgZGF0YVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRSYXRlTGltaXQoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsICcvcmF0ZV9saW1pdCcsIG51bGwsIGNiKTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJhdGVMaW1pdDtcclxuIl19
//# sourceMappingURL=RateLimit.js.map
