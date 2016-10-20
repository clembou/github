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
    global.Markdown = mod.exports;
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

  var Markdown = function (_Requestable) {
    _inherits(Markdown, _Requestable);

    /**
     * construct a RateLimit
     * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
     * @param {string} [apiBase] - the base Github API URL
     * @return {Promise} - the promise for the http request
     */
    function Markdown(auth, apiBase) {
      _classCallCheck(this, Markdown);

      return _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this, auth, apiBase));
    }

    /**
     * Render html from Markdown text.
     * @see https://developer.github.com/v3/markdown/#render-an-arbitrary-markdown-document
     * @param {Object} options - conversion options
     * @param {string} [options.text] - the markdown text to convert
     * @param {string} [options.mode=markdown] - can be either `markdown` or `gfm`
     * @param {string} [options.context] - repository name if mode is gfm
     * @param {Requestable.callback} [cb] - will receive the converted html
     * @return {Promise} - the promise for the http request
     */


    _createClass(Markdown, [{
      key: 'render',
      value: function render(options, cb) {
        return this._request('POST', '/markdown', options, cb);
      }
    }]);

    return Markdown;
  }(_Requestable3.default);

  module.exports = Markdown;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hcmtkb3duLmpzIl0sIm5hbWVzIjpbIk1hcmtkb3duIiwiYXV0aCIsImFwaUJhc2UiLCJvcHRpb25zIiwiY2IiLCJfcmVxdWVzdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BWU1BLFE7OztBQUNIOzs7Ozs7QUFNQSxzQkFBWUMsSUFBWixFQUFrQkMsT0FBbEIsRUFBMkI7QUFBQTs7QUFBQSxpSEFDbEJELElBRGtCLEVBQ1pDLE9BRFk7QUFFMUI7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7OzZCQVVPQyxPLEVBQVNDLEUsRUFBSTtBQUNqQixlQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLEVBQXNCLFdBQXRCLEVBQW1DRixPQUFuQyxFQUE0Q0MsRUFBNUMsQ0FBUDtBQUNGOzs7Ozs7QUFHSkUsU0FBT0MsT0FBUCxHQUFpQlAsUUFBakIiLCJmaWxlIjoiTWFya2Rvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVcclxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxyXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxyXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xyXG5cclxuLyoqXHJcbiAqIFJhdGVMaW1pdCBhbGxvd3MgdXNlcnMgdG8gcXVlcnkgdGhlaXIgcmF0ZS1saW1pdCBzdGF0dXNcclxuICovXHJcbmNsYXNzIE1hcmtkb3duIGV4dGVuZHMgUmVxdWVzdGFibGUge1xyXG4gICAvKipcclxuICAgICogY29uc3RydWN0IGEgUmF0ZUxpbWl0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gYXV0aCAtIHRoZSBjcmVkZW50aWFscyB0byBhdXRoZW50aWNhdGUgdG8gR2l0SHViXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpQmFzZV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjb25zdHJ1Y3RvcihhdXRoLCBhcGlCYXNlKSB7XHJcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmVuZGVyIGh0bWwgZnJvbSBNYXJrZG93biB0ZXh0LlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvbWFya2Rvd24vI3JlbmRlci1hbi1hcmJpdHJhcnktbWFya2Rvd24tZG9jdW1lbnRcclxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBjb252ZXJzaW9uIG9wdGlvbnNcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnRleHRdIC0gdGhlIG1hcmtkb3duIHRleHQgdG8gY29udmVydFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubW9kZT1tYXJrZG93bl0gLSBjYW4gYmUgZWl0aGVyIGBtYXJrZG93bmAgb3IgYGdmbWBcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNvbnRleHRdIC0gcmVwb3NpdG9yeSBuYW1lIGlmIG1vZGUgaXMgZ2ZtXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNvbnZlcnRlZCBodG1sXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIHJlbmRlcihvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsICcvbWFya2Rvd24nLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZG93bjtcclxuIl19
//# sourceMappingURL=Markdown.js.map
