(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define(['module', './Requestable', 'debug'], factory);
   } else if (typeof exports !== "undefined") {
      factory(module, require('./Requestable'), require('debug'));
   } else {
      var mod = {
         exports: {}
      };
      factory(mod, global.Requestable, global.debug);
      global.Search = mod.exports;
   }
})(this, function (module, _Requestable2, _debug) {
   'use strict';

   var _Requestable3 = _interopRequireDefault(_Requestable2);

   var _debug2 = _interopRequireDefault(_debug);

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

   var log = (0, _debug2.default)('github:search');

   /**
    * Wrap the Search API
    */

   var Search = function (_Requestable) {
      _inherits(Search, _Requestable);

      /**
       * Create a Search
       * @param {Object} defaults - defaults for the search
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */
      function Search(defaults, auth, apiBase) {
         _classCallCheck(this, Search);

         var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, auth, apiBase));

         _this.__defaults = _this._getOptionsWithDefaults(defaults);
         return _this;
      }

      /**
       * Available search options
       * @see https://developer.github.com/v3/search/#parameters
       * @typedef {Object} Search.Params
       * @param {string} q - the query to make
       * @param {string} sort - the sort field, one of `stars`, `forks`, or `updated`.
       *                      Default is [best match](https://developer.github.com/v3/search/#ranking-search-results)
       * @param {string} order - the ordering, either `asc` or `desc`
       */
      /**
       * Perform a search on the GitHub API
       * @private
       * @param {string} path - the scope of the search
       * @param {Search.Params} [withOptions] - additional parameters for the search
       * @param {Requestable.callback} [cb] - will receive the results of the search
       * @return {Promise} - the promise for the http request
       */


      _createClass(Search, [{
         key: '_search',
         value: function _search(path) {
            var _this2 = this;

            var withOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            var requestOptions = {};
            Object.keys(this.__defaults).forEach(function (prop) {
               requestOptions[prop] = _this2.__defaults[prop];
            });
            Object.keys(withOptions).forEach(function (prop) {
               requestOptions[prop] = withOptions[prop];
            });

            log('searching ' + path + ' with options:', requestOptions);
            return this._requestAllPages('/search/' + path, requestOptions, cb);
         }
      }, {
         key: 'forRepositories',
         value: function forRepositories(options, cb) {
            return this._search('repositories', options, cb);
         }
      }, {
         key: 'forCode',
         value: function forCode(options, cb) {
            return this._search('code', options, cb);
         }
      }, {
         key: 'forIssues',
         value: function forIssues(options, cb) {
            return this._search('issues', options, cb);
         }
      }, {
         key: 'forUsers',
         value: function forUsers(options, cb) {
            return this._search('users', options, cb);
         }
      }]);

      return Search;
   }(_Requestable3.default);

   module.exports = Search;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaC5qcyJdLCJuYW1lcyI6WyJsb2ciLCJTZWFyY2giLCJkZWZhdWx0cyIsImF1dGgiLCJhcGlCYXNlIiwiX19kZWZhdWx0cyIsIl9nZXRPcHRpb25zV2l0aERlZmF1bHRzIiwicGF0aCIsIndpdGhPcHRpb25zIiwiY2IiLCJ1bmRlZmluZWQiLCJyZXF1ZXN0T3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicHJvcCIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJvcHRpb25zIiwiX3NlYXJjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxPQUFNQSxNQUFNLHFCQUFNLGVBQU4sQ0FBWjs7QUFFQTs7OztPQUdNQyxNOzs7QUFDSDs7Ozs7O0FBTUEsc0JBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxPQUE1QixFQUFxQztBQUFBOztBQUFBLHFIQUM1QkQsSUFENEIsRUFDdEJDLE9BRHNCOztBQUVsQyxlQUFLQyxVQUFMLEdBQWtCLE1BQUtDLHVCQUFMLENBQTZCSixRQUE3QixDQUFsQjtBQUZrQztBQUdwQzs7QUFFRDs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7OztpQ0FRUUssSSxFQUF3QztBQUFBOztBQUFBLGdCQUFsQ0MsV0FBa0MsdUVBQXBCLEVBQW9CO0FBQUEsZ0JBQWhCQyxFQUFnQix1RUFBWEMsU0FBVzs7QUFDN0MsZ0JBQUlDLGlCQUFpQixFQUFyQjtBQUNBQyxtQkFBT0MsSUFBUCxDQUFZLEtBQUtSLFVBQWpCLEVBQTZCUyxPQUE3QixDQUFxQyxVQUFDQyxJQUFELEVBQVU7QUFDNUNKLDhCQUFlSSxJQUFmLElBQXVCLE9BQUtWLFVBQUwsQ0FBZ0JVLElBQWhCLENBQXZCO0FBQ0YsYUFGRDtBQUdBSCxtQkFBT0MsSUFBUCxDQUFZTCxXQUFaLEVBQXlCTSxPQUF6QixDQUFpQyxVQUFDQyxJQUFELEVBQVU7QUFDeENKLDhCQUFlSSxJQUFmLElBQXVCUCxZQUFZTyxJQUFaLENBQXZCO0FBQ0YsYUFGRDs7QUFJQWYsK0JBQWlCTyxJQUFqQixxQkFBdUNJLGNBQXZDO0FBQ0EsbUJBQU8sS0FBS0ssZ0JBQUwsY0FBaUNULElBQWpDLEVBQXlDSSxjQUF6QyxFQUF5REYsRUFBekQsQ0FBUDtBQUNGOzs7eUNBU2VRLE8sRUFBU1IsRSxFQUFJO0FBQzFCLG1CQUFPLEtBQUtTLE9BQUwsQ0FBYSxjQUFiLEVBQTZCRCxPQUE3QixFQUFzQ1IsRUFBdEMsQ0FBUDtBQUNGOzs7aUNBU09RLE8sRUFBU1IsRSxFQUFJO0FBQ2xCLG1CQUFPLEtBQUtTLE9BQUwsQ0FBYSxNQUFiLEVBQXFCRCxPQUFyQixFQUE4QlIsRUFBOUIsQ0FBUDtBQUNGOzs7bUNBU1NRLE8sRUFBU1IsRSxFQUFJO0FBQ3BCLG1CQUFPLEtBQUtTLE9BQUwsQ0FBYSxRQUFiLEVBQXVCRCxPQUF2QixFQUFnQ1IsRUFBaEMsQ0FBUDtBQUNGOzs7a0NBU1FRLE8sRUFBU1IsRSxFQUFJO0FBQ25CLG1CQUFPLEtBQUtTLE9BQUwsQ0FBYSxPQUFiLEVBQXNCRCxPQUF0QixFQUErQlIsRUFBL0IsQ0FBUDtBQUNGOzs7Ozs7QUFHSlUsVUFBT0MsT0FBUCxHQUFpQm5CLE1BQWpCIiwiZmlsZSI6IlNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXHJcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXHJcbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XHJcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XHJcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6c2VhcmNoJyk7XHJcblxyXG4vKipcclxuICogV3JhcCB0aGUgU2VhcmNoIEFQSVxyXG4gKi9cclxuY2xhc3MgU2VhcmNoIGV4dGVuZHMgUmVxdWVzdGFibGUge1xyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgU2VhcmNoXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0cyAtIGRlZmF1bHRzIGZvciB0aGUgc2VhcmNoXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IoZGVmYXVsdHMsIGF1dGgsIGFwaUJhc2UpIHtcclxuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XHJcbiAgICAgIHRoaXMuX19kZWZhdWx0cyA9IHRoaXMuX2dldE9wdGlvbnNXaXRoRGVmYXVsdHMoZGVmYXVsdHMpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQXZhaWxhYmxlIHNlYXJjaCBvcHRpb25zXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3BhcmFtZXRlcnNcclxuICAgICogQHR5cGVkZWYge09iamVjdH0gU2VhcmNoLlBhcmFtc1xyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcSAtIHRoZSBxdWVyeSB0byBtYWtlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0IC0gdGhlIHNvcnQgZmllbGQsIG9uZSBvZiBgc3RhcnNgLCBgZm9ya3NgLCBvciBgdXBkYXRlZGAuXHJcbiAgICAqICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHQgaXMgW2Jlc3QgbWF0Y2hdKGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvc2VhcmNoLyNyYW5raW5nLXNlYXJjaC1yZXN1bHRzKVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3JkZXIgLSB0aGUgb3JkZXJpbmcsIGVpdGhlciBgYXNjYCBvciBgZGVzY2BcclxuICAgICovXHJcbiAgIC8qKlxyXG4gICAgKiBQZXJmb3JtIGEgc2VhcmNoIG9uIHRoZSBHaXRIdWIgQVBJXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHNjb3BlIG9mIHRoZSBzZWFyY2hcclxuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbd2l0aE9wdGlvbnNdIC0gYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc2VhcmNoXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdHMgb2YgdGhlIHNlYXJjaFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBfc2VhcmNoKHBhdGgsIHdpdGhPcHRpb25zID0ge30sIGNiID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCByZXF1ZXN0T3B0aW9ucyA9IHt9O1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9fZGVmYXVsdHMpLmZvckVhY2goKHByb3ApID0+IHtcclxuICAgICAgICAgcmVxdWVzdE9wdGlvbnNbcHJvcF0gPSB0aGlzLl9fZGVmYXVsdHNbcHJvcF07XHJcbiAgICAgIH0pO1xyXG4gICAgICBPYmplY3Qua2V5cyh3aXRoT3B0aW9ucykuZm9yRWFjaCgocHJvcCkgPT4ge1xyXG4gICAgICAgICByZXF1ZXN0T3B0aW9uc1twcm9wXSA9IHdpdGhPcHRpb25zW3Byb3BdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxvZyhgc2VhcmNoaW5nICR7cGF0aH0gd2l0aCBvcHRpb25zOmAsIHJlcXVlc3RPcHRpb25zKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL3NlYXJjaC8ke3BhdGh9YCwgcmVxdWVzdE9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFNlYXJjaCBmb3IgcmVwb3NpdG9yaWVzXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC1yZXBvc2l0b3JpZXNcclxuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbb3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGZvclJlcG9zaXRvcmllcyhvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKCdyZXBvc2l0b3JpZXMnLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTZWFyY2ggZm9yIGNvZGVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3NlYXJjaC8jc2VhcmNoLWNvZGVcclxuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbb3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGZvckNvZGUob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCgnY29kZScsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFNlYXJjaCBmb3IgaXNzdWVzXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC1pc3N1ZXNcclxuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbb3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGZvcklzc3VlcyhvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKCdpc3N1ZXMnLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTZWFyY2ggZm9yIHVzZXJzXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC11c2Vyc1xyXG4gICAgKiBAcGFyYW0ge1NlYXJjaC5QYXJhbXN9IFtvcHRpb25zXSAtIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNlYXJjaFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZXN1bHRzIG9mIHRoZSBzZWFyY2hcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZm9yVXNlcnMob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCgndXNlcnMnLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWFyY2g7XHJcbiJdfQ==
//# sourceMappingURL=Search.js.map
