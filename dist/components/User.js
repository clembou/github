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
      global.User = mod.exports;
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

   var log = (0, _debug2.default)('github:user');

   /**
    * A User allows scoping of API requests to a particular Github user.
    */

   var User = function (_Requestable) {
      _inherits(User, _Requestable);

      /**
       * Create a User.
       * @param {string} [username] - the user to use for user-scoped queries
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */
      function User(username, auth, apiBase) {
         _classCallCheck(this, User);

         var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, auth, apiBase));

         _this.__user = username;
         return _this;
      }

      /**
       * Get the url for the request. (dependent on if we're requesting for the authenticated user or not)
       * @private
       * @param {string} endpoint - the endpoint being requested
       * @return {string} - the resolved endpoint
       */


      _createClass(User, [{
         key: '__getScopedUrl',
         value: function __getScopedUrl(endpoint) {
            if (this.__user) {
               return endpoint ? '/users/' + this.__user + '/' + endpoint : '/users/' + this.__user;
            } else {
               // eslint-disable-line
               switch (endpoint) {
                  case '':
                     return '/user';

                  case 'notifications':
                  case 'gists':
                     return '/' + endpoint;

                  default:
                     return '/user/' + endpoint;
               }
            }
         }
      }, {
         key: 'listRepos',
         value: function listRepos(options, cb) {
            if (typeof options === 'function') {
               cb = options;
               options = {};
            }

            options = this._getOptionsWithDefaults(options);

            log('Fetching repositories with options: ' + JSON.stringify(options));
            return this._requestAllPages(this.__getScopedUrl('repos'), options, cb);
         }
      }, {
         key: 'listOrgs',
         value: function listOrgs(cb) {
            return this._request('GET', this.__getScopedUrl('orgs'), null, cb);
         }
      }, {
         key: 'listGists',
         value: function listGists(cb) {
            return this._request('GET', this.__getScopedUrl('gists'), null, cb);
         }
      }, {
         key: 'listNotifications',
         value: function listNotifications(options, cb) {
            options = options || {};
            if (typeof options === 'function') {
               cb = options;
               options = {};
            }

            options.since = this._dateToISO(options.since);
            options.before = this._dateToISO(options.before);

            return this._request('GET', this.__getScopedUrl('notifications'), options, cb);
         }
      }, {
         key: 'getProfile',
         value: function getProfile(cb) {
            return this._request('GET', this.__getScopedUrl(''), null, cb);
         }
      }, {
         key: 'listStarredRepos',
         value: function listStarredRepos(cb) {
            var requestOptions = this._getOptionsWithDefaults();
            return this._requestAllPages(this.__getScopedUrl('starred'), requestOptions, cb);
         }
      }, {
         key: 'follow',
         value: function follow(username, cb) {
            return this._request('PUT', '/user/following/' + this.__user, null, cb);
         }
      }, {
         key: 'unfollow',
         value: function unfollow(username, cb) {
            return this._request('DELETE', '/user/following/' + this.__user, null, cb);
         }
      }, {
         key: 'createRepo',
         value: function createRepo(options, cb) {
            return this._request('POST', '/user/repos', options, cb);
         }
      }]);

      return User;
   }(_Requestable3.default);

   module.exports = User;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVzZXIuanMiXSwibmFtZXMiOlsibG9nIiwiVXNlciIsInVzZXJuYW1lIiwiYXV0aCIsImFwaUJhc2UiLCJfX3VzZXIiLCJlbmRwb2ludCIsIm9wdGlvbnMiLCJjYiIsIl9nZXRPcHRpb25zV2l0aERlZmF1bHRzIiwiSlNPTiIsInN0cmluZ2lmeSIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJfX2dldFNjb3BlZFVybCIsIl9yZXF1ZXN0Iiwic2luY2UiLCJfZGF0ZVRvSVNPIiwiYmVmb3JlIiwicmVxdWVzdE9wdGlvbnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTUEsTUFBTSxxQkFBTSxhQUFOLENBQVo7O0FBRUE7Ozs7T0FHTUMsSTs7O0FBQ0g7Ozs7OztBQU1BLG9CQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsT0FBNUIsRUFBcUM7QUFBQTs7QUFBQSxpSEFDNUJELElBRDRCLEVBQ3RCQyxPQURzQjs7QUFFbEMsZUFBS0MsTUFBTCxHQUFjSCxRQUFkO0FBRmtDO0FBR3BDOztBQUVEOzs7Ozs7Ozs7O3dDQU1lSSxRLEVBQVU7QUFDdEIsZ0JBQUksS0FBS0QsTUFBVCxFQUFpQjtBQUNkLHNCQUFPQyx1QkFDTSxLQUFLRCxNQURYLFNBQ3FCQyxRQURyQixlQUVNLEtBQUtELE1BRmxCO0FBS0YsYUFORCxNQU1PO0FBQUU7QUFDTix1QkFBUUMsUUFBUjtBQUNHLHVCQUFLLEVBQUw7QUFDRyw0QkFBTyxPQUFQOztBQUVILHVCQUFLLGVBQUw7QUFDQSx1QkFBSyxPQUFMO0FBQ0csa0NBQVdBLFFBQVg7O0FBRUg7QUFDRyx1Q0FBZ0JBLFFBQWhCO0FBVE47QUFXRjtBQUNIOzs7bUNBU1NDLE8sRUFBU0MsRSxFQUFJO0FBQ3BCLGdCQUFJLE9BQU9ELE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDaENDLG9CQUFLRCxPQUFMO0FBQ0FBLHlCQUFVLEVBQVY7QUFDRjs7QUFFREEsc0JBQVUsS0FBS0UsdUJBQUwsQ0FBNkJGLE9BQTdCLENBQVY7O0FBRUFQLHlEQUEyQ1UsS0FBS0MsU0FBTCxDQUFlSixPQUFmLENBQTNDO0FBQ0EsbUJBQU8sS0FBS0ssZ0JBQUwsQ0FBc0IsS0FBS0MsY0FBTCxDQUFvQixPQUFwQixDQUF0QixFQUFvRE4sT0FBcEQsRUFBNkRDLEVBQTdELENBQVA7QUFDRjs7O2tDQVFRQSxFLEVBQUk7QUFDVixtQkFBTyxLQUFLTSxRQUFMLENBQWMsS0FBZCxFQUFxQixLQUFLRCxjQUFMLENBQW9CLE1BQXBCLENBQXJCLEVBQWtELElBQWxELEVBQXdETCxFQUF4RCxDQUFQO0FBQ0Y7OzttQ0FRU0EsRSxFQUFJO0FBQ1gsbUJBQU8sS0FBS00sUUFBTCxDQUFjLEtBQWQsRUFBcUIsS0FBS0QsY0FBTCxDQUFvQixPQUFwQixDQUFyQixFQUFtRCxJQUFuRCxFQUF5REwsRUFBekQsQ0FBUDtBQUNGOzs7MkNBU2lCRCxPLEVBQVNDLEUsRUFBSTtBQUM1QkQsc0JBQVVBLFdBQVcsRUFBckI7QUFDQSxnQkFBSSxPQUFPQSxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2hDQyxvQkFBS0QsT0FBTDtBQUNBQSx5QkFBVSxFQUFWO0FBQ0Y7O0FBRURBLG9CQUFRUSxLQUFSLEdBQWdCLEtBQUtDLFVBQUwsQ0FBZ0JULFFBQVFRLEtBQXhCLENBQWhCO0FBQ0FSLG9CQUFRVSxNQUFSLEdBQWlCLEtBQUtELFVBQUwsQ0FBZ0JULFFBQVFVLE1BQXhCLENBQWpCOztBQUVBLG1CQUFPLEtBQUtILFFBQUwsQ0FBYyxLQUFkLEVBQXFCLEtBQUtELGNBQUwsQ0FBb0IsZUFBcEIsQ0FBckIsRUFBMkROLE9BQTNELEVBQW9FQyxFQUFwRSxDQUFQO0FBQ0Y7OztvQ0FRVUEsRSxFQUFJO0FBQ1osbUJBQU8sS0FBS00sUUFBTCxDQUFjLEtBQWQsRUFBcUIsS0FBS0QsY0FBTCxDQUFvQixFQUFwQixDQUFyQixFQUE4QyxJQUE5QyxFQUFvREwsRUFBcEQsQ0FBUDtBQUNGOzs7MENBUWdCQSxFLEVBQUk7QUFDbEIsZ0JBQUlVLGlCQUFpQixLQUFLVCx1QkFBTCxFQUFyQjtBQUNBLG1CQUFPLEtBQUtHLGdCQUFMLENBQXNCLEtBQUtDLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBdEIsRUFBc0RLLGNBQXRELEVBQXNFVixFQUF0RSxDQUFQO0FBQ0Y7OztnQ0FTTU4sUSxFQUFVTSxFLEVBQUk7QUFDbEIsbUJBQU8sS0FBS00sUUFBTCxDQUFjLEtBQWQsdUJBQXdDLEtBQUtULE1BQTdDLEVBQXVELElBQXZELEVBQTZERyxFQUE3RCxDQUFQO0FBQ0Y7OztrQ0FTUU4sUSxFQUFVTSxFLEVBQUk7QUFDcEIsbUJBQU8sS0FBS00sUUFBTCxDQUFjLFFBQWQsdUJBQTJDLEtBQUtULE1BQWhELEVBQTBELElBQTFELEVBQWdFRyxFQUFoRSxDQUFQO0FBQ0Y7OztvQ0FTVUQsTyxFQUFTQyxFLEVBQUk7QUFDckIsbUJBQU8sS0FBS00sUUFBTCxDQUFjLE1BQWQsRUFBc0IsYUFBdEIsRUFBcUNQLE9BQXJDLEVBQThDQyxFQUE5QyxDQUFQO0FBQ0Y7Ozs7OztBQUdKVyxVQUFPQyxPQUFQLEdBQWlCbkIsSUFBakIiLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXHJcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXHJcbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XHJcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XHJcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6dXNlcicpO1xyXG5cclxuLyoqXHJcbiAqIEEgVXNlciBhbGxvd3Mgc2NvcGluZyBvZiBBUEkgcmVxdWVzdHMgdG8gYSBwYXJ0aWN1bGFyIEdpdGh1YiB1c2VyLlxyXG4gKi9cclxuY2xhc3MgVXNlciBleHRlbmRzIFJlcXVlc3RhYmxlIHtcclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIFVzZXIuXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdXNlcm5hbWVdIC0gdGhlIHVzZXIgdG8gdXNlIGZvciB1c2VyLXNjb3BlZCBxdWVyaWVzXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IodXNlcm5hbWUsIGF1dGgsIGFwaUJhc2UpIHtcclxuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XHJcbiAgICAgIHRoaXMuX191c2VyID0gdXNlcm5hbWU7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHVybCBmb3IgdGhlIHJlcXVlc3QuIChkZXBlbmRlbnQgb24gaWYgd2UncmUgcmVxdWVzdGluZyBmb3IgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvciBub3QpXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludCAtIHRoZSBlbmRwb2ludCBiZWluZyByZXF1ZXN0ZWRcclxuICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSByZXNvbHZlZCBlbmRwb2ludFxyXG4gICAgKi9cclxuICAgX19nZXRTY29wZWRVcmwoZW5kcG9pbnQpIHtcclxuICAgICAgaWYgKHRoaXMuX191c2VyKSB7XHJcbiAgICAgICAgIHJldHVybiBlbmRwb2ludCA/XHJcbiAgICAgICAgICAgIGAvdXNlcnMvJHt0aGlzLl9fdXNlcn0vJHtlbmRwb2ludH1gIDpcclxuICAgICAgICAgICAgYC91c2Vycy8ke3RoaXMuX191c2VyfWBcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgfSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICBzd2l0Y2ggKGVuZHBvaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJyc6XHJcbiAgICAgICAgICAgICAgIHJldHVybiAnL3VzZXInO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnbm90aWZpY2F0aW9ucyc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2dpc3RzJzpcclxuICAgICAgICAgICAgICAgcmV0dXJuIGAvJHtlbmRwb2ludH1gO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgcmV0dXJuIGAvdXNlci8ke2VuZHBvaW50fWA7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgdXNlcidzIHJlcG9zaXRvcmllc1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2xpc3QtdXNlci1yZXBvc2l0b3JpZXNcclxuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIGFueSBvcHRpb25zIHRvIHJlZmluZSB0aGUgc2VhcmNoXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RSZXBvcyhvcHRpb25zLCBjYikge1xyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgY2IgPSBvcHRpb25zO1xyXG4gICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zV2l0aERlZmF1bHRzKG9wdGlvbnMpO1xyXG5cclxuICAgICAgbG9nKGBGZXRjaGluZyByZXBvc2l0b3JpZXMgd2l0aCBvcHRpb25zOiAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKHRoaXMuX19nZXRTY29wZWRVcmwoJ3JlcG9zJyksIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIG9yZ3MgdGhhdCB0aGUgdXNlciBiZWxvbmdzIHRvXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzLyNsaXN0LXVzZXItb3JnYW5pemF0aW9uc1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIG9yZ2FuaXphdGlvbnNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdE9yZ3MoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHRoaXMuX19nZXRTY29wZWRVcmwoJ29yZ3MnKSwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgdXNlcidzIGdpc3RzXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jbGlzdC1hLXVzZXJzLWdpc3RzXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgZ2lzdHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdEdpc3RzKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCB0aGlzLl9fZ2V0U2NvcGVkVXJsKCdnaXN0cycpLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSB1c2VyJ3Mgbm90aWZpY2F0aW9uc1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvbm90aWZpY2F0aW9ucy8jbGlzdC15b3VyLW5vdGlmaWNhdGlvbnNcclxuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIGFueSBvcHRpb25zIHRvIHJlZmluZSB0aGUgc2VhcmNoXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3ROb3RpZmljYXRpb25zKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgY2IgPSBvcHRpb25zO1xyXG4gICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG9wdGlvbnMuc2luY2UgPSB0aGlzLl9kYXRlVG9JU08ob3B0aW9ucy5zaW5jZSk7XHJcbiAgICAgIG9wdGlvbnMuYmVmb3JlID0gdGhpcy5fZGF0ZVRvSVNPKG9wdGlvbnMuYmVmb3JlKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCB0aGlzLl9fZ2V0U2NvcGVkVXJsKCdub3RpZmljYXRpb25zJyksIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFNob3cgdGhlIHVzZXIncyBwcm9maWxlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My91c2Vycy8jZ2V0LWEtc2luZ2xlLXVzZXJcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgdXNlcidzIGluZm9ybWF0aW9uXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldFByb2ZpbGUoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHRoaXMuX19nZXRTY29wZWRVcmwoJycpLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXRzIHRoZSBsaXN0IG9mIHN0YXJyZWQgcmVwb3NpdG9yaWVzIGZvciB0aGUgdXNlclxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI2xpc3QtcmVwb3NpdG9yaWVzLWJlaW5nLXN0YXJyZWRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBzdGFycmVkIHJlcG9zaXRvcmllc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0U3RhcnJlZFJlcG9zKGNiKSB7XHJcbiAgICAgIGxldCByZXF1ZXN0T3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnNXaXRoRGVmYXVsdHMoKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyh0aGlzLl9fZ2V0U2NvcGVkVXJsKCdzdGFycmVkJyksIHJlcXVlc3RPcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBIYXZlIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgZm9sbG93IHRoaXMgdXNlclxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvdXNlcnMvZm9sbG93ZXJzLyNmb2xsb3ctYS11c2VyXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIHRoZSB1c2VyIHRvIGZvbGxvd1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZm9sbG93KHVzZXJuYW1lLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC91c2VyL2ZvbGxvd2luZy8ke3RoaXMuX191c2VyfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEhhdmUgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXIgdW5mb2xsb3cgdGhpcyB1c2VyXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My91c2Vycy9mb2xsb3dlcnMvI2ZvbGxvdy1hLXVzZXJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gdGhlIHVzZXIgdG8gdW5mb2xsb3dcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHJlY2VpdmVzIHRydWUgaWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgdW5mb2xsb3codXNlcm5hbWUsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3VzZXIvZm9sbG93aW5nLyR7dGhpcy5fX3VzZXJ9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgbmV3IHJlcG9zaXRvcnkgZm9yIHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jY3JlYXRlXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gdGhlIHJlcG9zaXRvcnkgZGVmaW5pdGlvblxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBBUEkgcmVzcG9uc2VcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlUmVwbyhvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsICcvdXNlci9yZXBvcycsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXI7XHJcbiJdfQ==
//# sourceMappingURL=User.js.map
