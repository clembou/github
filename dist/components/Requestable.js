(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define(['module', 'axios', 'debug', 'js-base64', 'es6-promise'], factory);
   } else if (typeof exports !== "undefined") {
      factory(module, require('axios'), require('debug'), require('js-base64'), require('es6-promise'));
   } else {
      var mod = {
         exports: {}
      };
      factory(mod, global.axios, global.debug, global.jsBase64, global.Promise);
      global.Requestable = mod.exports;
   }
})(this, function (module, _axios, _debug, _jsBase, _es6Promise) {
   'use strict';

   var _axios2 = _interopRequireDefault(_axios);

   var _debug2 = _interopRequireDefault(_debug);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
   } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
   };

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

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

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

   var log = (0, _debug2.default)('github:request');

   if (typeof Promise === 'undefined') {
      (0, _es6Promise.polyfill)();
   }

   /**
    * The error structure returned when a network call fails
    */

   var ResponseError = function (_Error) {
      _inherits(ResponseError, _Error);

      /**
       * Construct a new ResponseError
       * @param {string} message - an message to return instead of the the default error message
       * @param {string} path - the requested path
       * @param {Object} response - the object returned by Axios
       */
      function ResponseError(message, path, response) {
         _classCallCheck(this, ResponseError);

         var _this = _possibleConstructorReturn(this, (ResponseError.__proto__ || Object.getPrototypeOf(ResponseError)).call(this, message));

         _this.path = path;
         _this.request = response.config;
         _this.response = response;
         _this.status = response.status;
         return _this;
      }

      return ResponseError;
   }(Error);

   var Requestable = function () {
      /**
       * Either a username and password or an oauth token for Github
       * @typedef {Object} Requestable.auth
       * @prop {string} [username] - the Github username
       * @prop {string} [password] - the user's password
       * @prop {token} [token] - an OAuth token
       */
      /**
       * Initialize the http internals.
       * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
       *                                  not provided request will be made unauthenticated
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */
      function Requestable(auth, apiBase) {
         _classCallCheck(this, Requestable);

         this.__apiBase = apiBase || 'https://api.github.com';
         this.__auth = {
            token: auth.token,
            bearer: auth.bearer,
            username: auth.username,
            password: auth.password
         };

         if (auth.token) {
            this.__authorizationHeader = 'token ' + auth.token;
         } else if (auth.bearer) {
            this.__authorizationHeader = 'Bearer ' + auth.bearer;
         } else if (auth.username && auth.password) {
            this.__authorizationHeader = 'Basic ' + _jsBase.Base64.encode(auth.username + ':' + auth.password);
         }
      }

      /**
       * Compute the URL to use to make a request.
       * @private
       * @param {string} path - either a URL relative to the API base or an absolute URL
       * @return {string} - the URL to use
       */


      _createClass(Requestable, [{
         key: '__getURL',
         value: function __getURL(path) {
            var url = path;

            if (path.indexOf('//') === -1) {
               url = this.__apiBase + path;
            }

            var newCacheBuster = 'timestamp=' + new Date().getTime();
            return url.replace(/(timestamp=\d+)/, newCacheBuster);
         }
      }, {
         key: '__getRequestHeaders',
         value: function __getRequestHeaders(raw) {
            var headers = {
               'Accept': raw ? 'application/vnd.github.v3.raw+json' : 'application/vnd.github.v3+json',
               'Content-Type': 'application/json;charset=UTF-8'
            };

            if (this.__authorizationHeader) {
               headers.Authorization = this.__authorizationHeader;
            }

            return headers;
         }
      }, {
         key: '_getOptionsWithDefaults',
         value: function _getOptionsWithDefaults() {
            var requestOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (!(requestOptions.visibility || requestOptions.affiliation)) {
               requestOptions.type = requestOptions.type || 'all';
            }
            requestOptions.sort = requestOptions.sort || 'updated';
            requestOptions.per_page = requestOptions.per_page || '100'; // eslint-disable-line

            return requestOptions;
         }
      }, {
         key: '_dateToISO',
         value: function _dateToISO(date) {
            if (date && date instanceof Date) {
               date = date.toISOString();
            }

            return date;
         }
      }, {
         key: '_request',
         value: function _request(method, path, data, cb, raw) {
            var url = this.__getURL(path);
            var headers = this.__getRequestHeaders(raw);
            var queryParams = {};

            var shouldUseDataAsParams = data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && methodHasNoBody(method);
            if (shouldUseDataAsParams) {
               queryParams = data;
               data = undefined;
            }

            var config = {
               url: url,
               method: method,
               headers: headers,
               params: queryParams,
               data: data,
               responseType: raw ? 'text' : 'json'
            };

            log(config.method + ' to ' + config.url);
            var requestPromise = (0, _axios2.default)(config).catch(callbackErrorOrThrow(cb, path));

            if (cb) {
               requestPromise.then(function (response) {
                  cb(null, response.data || true, response);
               });
            }

            return requestPromise;
         }
      }, {
         key: '_request204or404',
         value: function _request204or404(path, data, cb) {
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';

            return this._request(method, path, data).then(function success(response) {
               if (cb) {
                  cb(null, true, response);
               }
               return true;
            }, function failure(response) {
               if (response.status === 404) {
                  if (cb) {
                     cb(null, false, response);
                  }
                  return false;
               }

               if (cb) {
                  cb(response);
               }
               throw response;
            });
         }
      }, {
         key: '_requestAllPages',
         value: function _requestAllPages(path, options, cb, results) {
            var _this2 = this;

            results = results || [];

            return this._request('GET', path, options).then(function (response) {
               var thisGroup = void 0;
               if (response.data instanceof Array) {
                  thisGroup = response.data;
               } else if (response.data.items instanceof Array) {
                  thisGroup = response.data.items;
               } else {
                  var message = 'cannot figure out how to append ' + response.data + ' to the result set';
                  throw new ResponseError(message, path, response);
               }
               results.push.apply(results, thisGroup);

               var nextUrl = getNextPage(response.headers.link);
               if (nextUrl) {
                  log('getting next page: ' + nextUrl);
                  return _this2._requestAllPages(nextUrl, options, cb, results);
               }

               if (cb) {
                  cb(null, results, response);
               }

               response.data = results;
               return response;
            }).catch(callbackErrorOrThrow(cb, path));
         }
      }]);

      return Requestable;
   }();

   module.exports = Requestable;

   // ////////////////////////// //
   //  Private helper functions  //
   // ////////////////////////// //
   var METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
   function methodHasNoBody(method) {
      return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
   }

   function getNextPage() {
      var linksHeader = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var links = linksHeader.split(/\s*,\s*/); // splits and strips the urls
      return links.reduce(function (nextUrl, link) {
         if (link.search(/rel="next"/) !== -1) {
            return (link.match(/<(.*)>/) || [])[1];
         }

         return nextUrl;
      }, undefined);
   }

   function callbackErrorOrThrow(cb, path) {
      return function handler(object) {
         var error = void 0;
         if (object.hasOwnProperty('config')) {
            var status = object.status;
            var statusText = object.statusText;
            var _object$config = object.config;
            var method = _object$config.method;
            var url = _object$config.url;

            var message = status + ' error making request ' + method + ' ' + url + ': "' + statusText + '"';
            error = new ResponseError(message, path, object);
            log(message + ' ' + JSON.stringify(object.data));
         } else {
            error = object;
         }
         if (cb) {
            log('going to error callback');
            cb(error);
         } else {
            log('throwing error');
            throw error;
         }
      };
   }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVlc3RhYmxlLmpzIl0sIm5hbWVzIjpbImxvZyIsIlByb21pc2UiLCJSZXNwb25zZUVycm9yIiwibWVzc2FnZSIsInBhdGgiLCJyZXNwb25zZSIsInJlcXVlc3QiLCJjb25maWciLCJzdGF0dXMiLCJFcnJvciIsIlJlcXVlc3RhYmxlIiwiYXV0aCIsImFwaUJhc2UiLCJfX2FwaUJhc2UiLCJfX2F1dGgiLCJ0b2tlbiIsImJlYXJlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJfX2F1dGhvcml6YXRpb25IZWFkZXIiLCJlbmNvZGUiLCJ1cmwiLCJpbmRleE9mIiwibmV3Q2FjaGVCdXN0ZXIiLCJEYXRlIiwiZ2V0VGltZSIsInJlcGxhY2UiLCJyYXciLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInJlcXVlc3RPcHRpb25zIiwidmlzaWJpbGl0eSIsImFmZmlsaWF0aW9uIiwidHlwZSIsInNvcnQiLCJwZXJfcGFnZSIsImRhdGUiLCJ0b0lTT1N0cmluZyIsIm1ldGhvZCIsImRhdGEiLCJjYiIsIl9fZ2V0VVJMIiwiX19nZXRSZXF1ZXN0SGVhZGVycyIsInF1ZXJ5UGFyYW1zIiwic2hvdWxkVXNlRGF0YUFzUGFyYW1zIiwibWV0aG9kSGFzTm9Cb2R5IiwidW5kZWZpbmVkIiwicGFyYW1zIiwicmVzcG9uc2VUeXBlIiwicmVxdWVzdFByb21pc2UiLCJjYXRjaCIsImNhbGxiYWNrRXJyb3JPclRocm93IiwidGhlbiIsIl9yZXF1ZXN0Iiwic3VjY2VzcyIsImZhaWx1cmUiLCJvcHRpb25zIiwicmVzdWx0cyIsInRoaXNHcm91cCIsIkFycmF5IiwiaXRlbXMiLCJwdXNoIiwiYXBwbHkiLCJuZXh0VXJsIiwiZ2V0TmV4dFBhZ2UiLCJsaW5rIiwiX3JlcXVlc3RBbGxQYWdlcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJNRVRIT0RTX1dJVEhfTk9fQk9EWSIsImxpbmtzSGVhZGVyIiwibGlua3MiLCJzcGxpdCIsInJlZHVjZSIsInNlYXJjaCIsIm1hdGNoIiwiaGFuZGxlciIsIm9iamVjdCIsImVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJzdGF0dXNUZXh0IiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlBLE9BQU1BLE1BQU0scUJBQU0sZ0JBQU4sQ0FBWjs7QUFFQSxPQUFJLE9BQU9DLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDakM7QUFDRjs7QUFFRDs7OztPQUdNQyxhOzs7QUFDSDs7Ozs7O0FBTUEsNkJBQVlDLE9BQVosRUFBcUJDLElBQXJCLEVBQTJCQyxRQUEzQixFQUFxQztBQUFBOztBQUFBLG1JQUM1QkYsT0FENEI7O0FBRWxDLGVBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLGVBQUtFLE9BQUwsR0FBZUQsU0FBU0UsTUFBeEI7QUFDQSxlQUFLRixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGVBQUtHLE1BQUwsR0FBY0gsU0FBU0csTUFBdkI7QUFMa0M7QUFNcEM7OztLQWJ3QkMsSzs7T0FtQnRCQyxXO0FBQ0g7Ozs7Ozs7QUFPQTs7Ozs7O0FBTUEsMkJBQVlDLElBQVosRUFBa0JDLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3hCLGNBQUtDLFNBQUwsR0FBaUJELFdBQVcsd0JBQTVCO0FBQ0EsY0FBS0UsTUFBTCxHQUFjO0FBQ1hDLG1CQUFPSixLQUFLSSxLQUREO0FBRVhDLG9CQUFRTCxLQUFLSyxNQUZGO0FBR1hDLHNCQUFVTixLQUFLTSxRQUhKO0FBSVhDLHNCQUFVUCxLQUFLTztBQUpKLFVBQWQ7O0FBT0EsYUFBSVAsS0FBS0ksS0FBVCxFQUFnQjtBQUNiLGlCQUFLSSxxQkFBTCxHQUE2QixXQUFXUixLQUFLSSxLQUE3QztBQUNGLFVBRkQsTUFFTyxJQUFJSixLQUFLSyxNQUFULEVBQWlCO0FBQ3JCLGlCQUFLRyxxQkFBTCxHQUE2QixZQUFZUixLQUFLSyxNQUE5QztBQUNGLFVBRk0sTUFFQSxJ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S0FBTjtBQUNGO0FBQ0gsT0FqQkQ7QUFrQkYiLCJmaWxlIjoiUmVxdWVzdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlXG4gKiBAY29weXJpZ2h0ICAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQge0Jhc2U2NH0gZnJvbSAnanMtYmFzZTY0JztcbmltcG9ydCB7cG9seWZpbGx9IGZyb20gJ2VzNi1wcm9taXNlJztcblxuY29uc3QgbG9nID0gZGVidWcoJ2dpdGh1YjpyZXF1ZXN0Jyk7XG5cbmlmICh0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgIHBvbHlmaWxsKCk7XG59XG5cbi8qKlxuICogVGhlIGVycm9yIHN0cnVjdHVyZSByZXR1cm5lZCB3aGVuIGEgbmV0d29yayBjYWxsIGZhaWxzXG4gKi9cbmNsYXNzIFJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAvKipcbiAgICAqIENvbnN0cnVjdCBhIG5ldyBSZXNwb25zZUVycm9yXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIGFuIG1lc3NhZ2UgdG8gcmV0dXJuIGluc3RlYWQgb2YgdGhlIHRoZSBkZWZhdWx0IGVycm9yIG1lc3NhZ2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHJlcXVlc3RlZCBwYXRoXG4gICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgLSB0aGUgb2JqZWN0IHJldHVybmVkIGJ5IEF4aW9zXG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHBhdGgsIHJlc3BvbnNlKSB7XG4gICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICB0aGlzLnJlcXVlc3QgPSByZXNwb25zZS5jb25maWc7XG4gICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgIH1cbn1cblxuLyoqXG4gKiBSZXF1ZXN0YWJsZSB3cmFwcyB0aGUgbG9naWMgZm9yIG1ha2luZyBodHRwIHJlcXVlc3RzIHRvIHRoZSBBUElcbiAqL1xuY2xhc3MgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBFaXRoZXIgYSB1c2VybmFtZSBhbmQgcGFzc3dvcmQgb3IgYW4gb2F1dGggdG9rZW4gZm9yIEdpdGh1YlxuICAgICogQHR5cGVkZWYge09iamVjdH0gUmVxdWVzdGFibGUuYXV0aFxuICAgICogQHByb3Age3N0cmluZ30gW3VzZXJuYW1lXSAtIHRoZSBHaXRodWIgdXNlcm5hbWVcbiAgICAqIEBwcm9wIHtzdHJpbmd9IFtwYXNzd29yZF0gLSB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgKiBAcHJvcCB7dG9rZW59IFt0b2tlbl0gLSBhbiBPQXV0aCB0b2tlblxuICAgICovXG4gICAvKipcbiAgICAqIEluaXRpYWxpemUgdGhlIGh0dHAgaW50ZXJuYWxzLlxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1Yi4gSWYgYXV0aCBpc1xuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IHByb3ZpZGVkIHJlcXVlc3Qgd2lsbCBiZSBtYWRlIHVuYXV0aGVudGljYXRlZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSkge1xuICAgICAgdGhpcy5fX2FwaUJhc2UgPSBhcGlCYXNlIHx8ICdodHRwczovL2FwaS5naXRodWIuY29tJztcbiAgICAgIHRoaXMuX19hdXRoID0ge1xuICAgICAgICAgdG9rZW46IGF1dGgudG9rZW4sXG4gICAgICAgICBiZWFyZXI6IGF1dGguYmVhcmVyLFxuICAgICAgICAgdXNlcm5hbWU6IGF1dGgudXNlcm5hbWUsXG4gICAgICAgICBwYXNzd29yZDogYXV0aC5wYXNzd29yZFxuICAgICAgfTtcblxuICAgICAgaWYgKGF1dGgudG9rZW4pIHtcbiAgICAgICAgIHRoaXMuX19hdXRob3JpemF0aW9uSGVhZGVyID0gJ3Rva2VuICcgKyBhdXRoLnRva2VuO1xuICAgICAgfSBlbHNlIGlmIChhdXRoLmJlYXJlcikge1xuICAgICAgICAgdGhpcy5fX2F1dGhvcml6YXRpb25IZWFkZXIgPSAnQmVhcmVyICcgKyBhdXRoLmJlYXJlcjtcbiAgICAgIH0gZWxzZSBpZiAoYXV0aC51c2VybmFtZSAmJiBhdXRoLnBhc3N3b3JkKSB7XG4gICAgICAgICB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlciA9ICdCYXNpYyAnICsgQmFzZTY0LmVuY29kZShhdXRoLnVzZXJuYW1lICsgJzonICsgYXV0aC5wYXNzd29yZCk7XG4gICAgICB9XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ29tcHV0ZSB0aGUgVVJMIHRvIHVzZSB0byBtYWtlIGEgcmVxdWVzdC5cbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGVpdGhlciBhIFVSTCByZWxhdGl2ZSB0byB0aGUgQVBJIGJhc2Ugb3IgYW4gYWJzb2x1dGUgVVJMXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIFVSTCB0byB1c2VcbiAgICAqL1xuICAgX19nZXRVUkwocGF0aCkge1xuICAgICAgbGV0IHVybCA9IHBhdGg7XG5cbiAgICAgIGlmIChwYXRoLmluZGV4T2YoJy8vJykgPT09IC0xKSB7XG4gICAgICAgICB1cmwgPSB0aGlzLl9fYXBpQmFzZSArIHBhdGg7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdDYWNoZUJ1c3RlciA9ICd0aW1lc3RhbXA9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC8odGltZXN0YW1wPVxcZCspLywgbmV3Q2FjaGVCdXN0ZXIpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXB1dGUgdGhlIGhlYWRlcnMgcmVxdWlyZWQgZm9yIGFuIEFQSSByZXF1ZXN0LlxuICAgICogQHByaXZhdGVcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmF3IC0gaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgSlNPTiBvciBhcyBhIHJhdyByZXF1ZXN0XG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIGhlYWRlcnMgdG8gdXNlIGluIHRoZSByZXF1ZXN0XG4gICAgKi9cbiAgIF9fZ2V0UmVxdWVzdEhlYWRlcnMocmF3KSB7XG4gICAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgICAgICdBY2NlcHQnOiByYXcgPyAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52My5yYXcranNvbicgOiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52Mytqc29uJyxcbiAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04J1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuX19hdXRob3JpemF0aW9uSGVhZGVyKSB7XG4gICAgICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2V0cyB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBBUEkgcmVxdWVzdHNcbiAgICAqIEBwcm90ZWN0ZWRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdE9wdGlvbnM9e31dIC0gdGhlIGN1cnJlbnQgb3B0aW9ucyBmb3IgdGhlIHJlcXVlc3RcbiAgICAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgb3B0aW9ucyB0byBwYXNzIHRvIHRoZSByZXF1ZXN0XG4gICAgKi9cbiAgIF9nZXRPcHRpb25zV2l0aERlZmF1bHRzKHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgIGlmICghKHJlcXVlc3RPcHRpb25zLnZpc2liaWxpdHkgfHwgcmVxdWVzdE9wdGlvbnMuYWZmaWxpYXRpb24pKSB7XG4gICAgICAgICByZXF1ZXN0T3B0aW9ucy50eXBlID0gcmVxdWVzdE9wdGlvbnMudHlwZSB8fCAnYWxsJztcbiAgICAgIH1cbiAgICAgIHJlcXVlc3RPcHRpb25zLnNvcnQgPSByZXF1ZXN0T3B0aW9ucy5zb3J0IHx8ICd1cGRhdGVkJztcbiAgICAgIHJlcXVlc3RPcHRpb25zLnBlcl9wYWdlID0gcmVxdWVzdE9wdGlvbnMucGVyX3BhZ2UgfHwgJzEwMCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgcmV0dXJuIHJlcXVlc3RPcHRpb25zO1xuICAgfVxuXG4gICAvKipcbiAgICAqIGlmIGEgYERhdGVgIGlzIHBhc3NlZCB0byB0aGlzIGZ1bmN0aW9uIGl0IHdpbGwgYmUgY29udmVydGVkIHRvIGFuIElTTyBzdHJpbmdcbiAgICAqIEBwYXJhbSB7Kn0gZGF0ZSAtIHRoZSBvYmplY3QgdG8gYXR0ZW1wdCB0byBjb29lcmNlIGludG8gYW4gSVNPIGRhdGUgc3RyaW5nXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIElTTyByZXByZXNlbnRhdGlvbiBvZiBgZGF0ZWAgb3Igd2hhdGV2ZXIgd2FzIHBhc3NlZCBpbiBpZiBpdCB3YXMgbm90IGEgZGF0ZVxuICAgICovXG4gICBfZGF0ZVRvSVNPKGRhdGUpIHtcbiAgICAgIGlmIChkYXRlICYmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgIGRhdGUgPSBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRlO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEEgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgcmVzdWx0IG9mIHRoZSBBUEkgcmVxdWVzdC5cbiAgICAqIEBjYWxsYmFjayBSZXF1ZXN0YWJsZS5jYWxsYmFja1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5FcnJvcn0gZXJyb3IgLSB0aGUgZXJyb3IgcmV0dXJuZWQgYnkgdGhlIEFQSSBvciBgbnVsbGBcbiAgICAqIEBwYXJhbSB7KE9iamVjdHx0cnVlKX0gcmVzdWx0IC0gdGhlIGRhdGEgcmV0dXJuZWQgYnkgdGhlIEFQSSBvciBgdHJ1ZWAgaWYgdGhlIEFQSSByZXR1cm5zIGAyMDQgTm8gQ29udGVudGBcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IC0gdGhlIHJhdyB7QGxpbmtjb2RlIGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL2F4aW9zI3Jlc3BvbnNlLXNjaGVtYSBSZXNwb25zZX1cbiAgICAqL1xuICAgLyoqXG4gICAgKiBNYWtlIGEgcmVxdWVzdC5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgLSB0aGUgbWV0aG9kIGZvciB0aGUgcmVxdWVzdCAoR0VULCBQVVQsIFBPU1QsIERFTEVURSlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggZm9yIHRoZSByZXF1ZXN0XG4gICAgKiBAcGFyYW0geyp9IFtkYXRhXSAtIHRoZSBkYXRhIHRvIHNlbmQgdG8gdGhlIHNlcnZlci4gRm9yIEhUVFAgbWV0aG9kcyB0aGF0IGRvbid0IGhhdmUgYSBib2R5IHRoZSBkYXRhXG4gICAgKiAgICAgICAgICAgICAgICAgICB3aWxsIGJlIHNlbnQgYXMgcXVlcnkgcGFyYW1ldGVyc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHRoZSBjYWxsYmFjayBmb3IgdGhlIHJlcXVlc3RcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jhdz1mYWxzZV0gLSBpZiB0aGUgcmVxdWVzdCBzaG91bGQgYmUgc2VudCBhcyByYXcuIElmIHRoaXMgaXMgYSBmYWxzeSB2YWx1ZSB0aGVuIHRoZVxuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0IHdpbGwgYmUgbWFkZSBhcyBKU09OXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIF9yZXF1ZXN0KG1ldGhvZCwgcGF0aCwgZGF0YSwgY2IsIHJhdykge1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5fX2dldFVSTChwYXRoKTtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLl9fZ2V0UmVxdWVzdEhlYWRlcnMocmF3KTtcbiAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHt9O1xuXG4gICAgICBjb25zdCBzaG91bGRVc2VEYXRhQXNQYXJhbXMgPSBkYXRhICYmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpICYmIG1ldGhvZEhhc05vQm9keShtZXRob2QpO1xuICAgICAgaWYgKHNob3VsZFVzZURhdGFBc1BhcmFtcykge1xuICAgICAgICAgcXVlcnlQYXJhbXMgPSBkYXRhO1xuICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICBwYXJhbXM6IHF1ZXJ5UGFyYW1zLFxuICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgIHJlc3BvbnNlVHlwZTogcmF3ID8gJ3RleHQnIDogJ2pzb24nXG4gICAgICB9O1xuXG4gICAgICBsb2coYCR7Y29uZmlnLm1ldGhvZH0gdG8gJHtjb25maWcudXJsfWApO1xuICAgICAgY29uc3QgcmVxdWVzdFByb21pc2UgPSBheGlvcyhjb25maWcpLmNhdGNoKGNhbGxiYWNrRXJyb3JPclRocm93KGNiLCBwYXRoKSk7XG5cbiAgICAgIGlmIChjYikge1xuICAgICAgICAgcmVxdWVzdFByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNiKG51bGwsIHJlc3BvbnNlLmRhdGEgfHwgdHJ1ZSwgcmVzcG9uc2UpO1xuICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0UHJvbWlzZTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBNYWtlIGEgcmVxdWVzdCB0byBhbiBlbmRwb2ludCB0aGUgcmV0dXJucyAyMDQgd2hlbiB0cnVlIGFuZCA0MDQgd2hlbiBmYWxzZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCB0byByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGFueSBxdWVyeSBwYXJhbWV0ZXJzIGZvciB0aGUgcmVxdWVzdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB0aGUgY2FsbGJhY2sgdGhhdCB3aWxsIHJlY2VpdmUgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAqIEBwYXJhbSB7bWV0aG9kfSBbbWV0aG9kPUdFVF0gLSBIVFRQIE1ldGhvZCB0byB1c2VcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgX3JlcXVlc3QyMDRvcjQwNChwYXRoLCBkYXRhLCBjYiwgbWV0aG9kID0gJ0dFVCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KG1ldGhvZCwgcGF0aCwgZGF0YSlcbiAgICAgICAgIC50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgY2IobnVsbCwgdHJ1ZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICB9LCBmdW5jdGlvbiBmYWlsdXJlKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgY2IobnVsbCwgZmFsc2UsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICBjYihyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyByZXNwb25zZTtcbiAgICAgICAgIH0pO1xuICAgfVxuXG4gICAvKipcbiAgICAqIE1ha2UgYSByZXF1ZXN0IGFuZCBmZXRjaCBhbGwgdGhlIGF2YWlsYWJsZSBkYXRhLiBHaXRodWIgd2lsbCBwYWdpbmF0ZSByZXNwb25zZXMgc28gZm9yIHF1ZXJpZXNcbiAgICAqIHRoYXQgbWlnaHQgc3BhbiBtdWx0aXBsZSBwYWdlcyB0aGlzIG1ldGhvZCBpcyBwcmVmZXJyZWQgdG8ge0BsaW5rIFJlcXVlc3RhYmxlI3JlcXVlc3R9XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIHRvIHJlcXVlc3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHRoZSBmdW5jdGlvbiB0byByZWNlaXZlIHRoZSBkYXRhLiBUaGUgcmV0dXJuZWQgZGF0YSB3aWxsIGFsd2F5cyBiZSBhbiBhcnJheS5cbiAgICAqIEBwYXJhbSB7T2JqZWN0W119IHJlc3VsdHMgLSB0aGUgcGFydGlhbCByZXN1bHRzLiBUaGlzIGFyZ3VtZW50IGlzIGludGVuZGVkIGZvciBpbnRlcmFsIHVzZSBvbmx5LlxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSBhIHByb21pc2Ugd2hpY2ggd2lsbCByZXNvbHZlIHdoZW4gYWxsIHBhZ2VzIGhhdmUgYmVlbiBmZXRjaGVkXG4gICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgZm9sZGVkIGludG8ge0BsaW5rIFJlcXVlc3RhYmxlI19yZXF1ZXN0fSBpbiB0aGUgMi4wIHJlbGVhc2UuXG4gICAgKi9cbiAgIF9yZXF1ZXN0QWxsUGFnZXMocGF0aCwgb3B0aW9ucywgY2IsIHJlc3VsdHMpIHtcbiAgICAgIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgcGF0aCwgb3B0aW9ucylcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHRoaXNHcm91cDtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgIHRoaXNHcm91cCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmRhdGEuaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgdGhpc0dyb3VwID0gcmVzcG9uc2UuZGF0YS5pdGVtcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGBjYW5ub3QgZmlndXJlIG91dCBob3cgdG8gYXBwZW5kICR7cmVzcG9uc2UuZGF0YX0gdG8gdGhlIHJlc3VsdCBzZXRgO1xuICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlc3BvbnNlRXJyb3IobWVzc2FnZSwgcGF0aCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoLmFwcGx5KHJlc3VsdHMsIHRoaXNHcm91cCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRVcmwgPSBnZXROZXh0UGFnZShyZXNwb25zZS5oZWFkZXJzLmxpbmspO1xuICAgICAgICAgICAgaWYgKG5leHRVcmwpIHtcbiAgICAgICAgICAgICAgIGxvZyhgZ2V0dGluZyBuZXh0IHBhZ2U6ICR7bmV4dFVybH1gKTtcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMobmV4dFVybCwgb3B0aW9ucywgY2IsIHJlc3VsdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3VsdHMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3VsdHM7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICB9KS5jYXRjaChjYWxsYmFja0Vycm9yT3JUaHJvdyhjYiwgcGF0aCkpO1xuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RhYmxlO1xuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAvL1xuLy8gIFByaXZhdGUgaGVscGVyIGZ1bmN0aW9ucyAgLy9cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIC8vXG5jb25zdCBNRVRIT0RTX1dJVEhfTk9fQk9EWSA9IFsnR0VUJywgJ0hFQUQnLCAnREVMRVRFJ107XG5mdW5jdGlvbiBtZXRob2RIYXNOb0JvZHkobWV0aG9kKSB7XG4gICByZXR1cm4gTUVUSE9EU19XSVRIX05PX0JPRFkuaW5kZXhPZihtZXRob2QpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0TmV4dFBhZ2UobGlua3NIZWFkZXIgPSAnJykge1xuICAgY29uc3QgbGlua3MgPSBsaW5rc0hlYWRlci5zcGxpdCgvXFxzKixcXHMqLyk7IC8vIHNwbGl0cyBhbmQgc3RyaXBzIHRoZSB1cmxzXG4gICByZXR1cm4gbGlua3MucmVkdWNlKGZ1bmN0aW9uKG5leHRVcmwsIGxpbmspIHtcbiAgICAgIGlmIChsaW5rLnNlYXJjaCgvcmVsPVwibmV4dFwiLykgIT09IC0xKSB7XG4gICAgICAgICByZXR1cm4gKGxpbmsubWF0Y2goLzwoLiopPi8pIHx8IFtdKVsxXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5leHRVcmw7XG4gICB9LCB1bmRlZmluZWQpO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja0Vycm9yT3JUaHJvdyhjYiwgcGF0aCkge1xuICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIob2JqZWN0KSB7XG4gICAgICBsZXQgZXJyb3I7XG4gICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KCdjb25maWcnKSkge1xuICAgICAgICAgY29uc3Qge3N0YXR1cywgc3RhdHVzVGV4dCwgY29uZmlnOiB7bWV0aG9kLCB1cmx9fSA9IG9iamVjdDtcbiAgICAgICAgIGxldCBtZXNzYWdlID0gKGAke3N0YXR1c30gZXJyb3IgbWFraW5nIHJlcXVlc3QgJHttZXRob2R9ICR7dXJsfTogXCIke3N0YXR1c1RleHR9XCJgKTtcbiAgICAgICAgIGVycm9yID0gbmV3IFJlc3BvbnNlRXJyb3IobWVzc2FnZSwgcGF0aCwgb2JqZWN0KTtcbiAgICAgICAgIGxvZyhgJHttZXNzYWdlfSAke0pTT04uc3RyaW5naWZ5KG9iamVjdC5kYXRhKX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBlcnJvciA9IG9iamVjdDtcbiAgICAgIH1cbiAgICAgIGlmIChjYikge1xuICAgICAgICAgbG9nKCdnb2luZyB0byBlcnJvciBjYWxsYmFjaycpO1xuICAgICAgICAgY2IoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGxvZygndGhyb3dpbmcgZXJyb3InKTtcbiAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgfTtcbn1cbiJdfQ==
//# sourceMappingURL=Requestable.js.map
