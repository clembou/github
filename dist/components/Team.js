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
      global.Team = mod.exports;
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

   var log = (0, _debug2.default)('github:team');

   /**
    * A Team allows scoping of API requests to a particular Github Organization Team.
    */

   var Team = function (_Requestable) {
      _inherits(Team, _Requestable);

      /**
       * Create a Team.
       * @param {string} [teamId] - the id for the team
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */
      function Team(teamId, auth, apiBase) {
         _classCallCheck(this, Team);

         var _this = _possibleConstructorReturn(this, (Team.__proto__ || Object.getPrototypeOf(Team)).call(this, auth, apiBase));

         _this.__teamId = teamId;
         return _this;
      }

      /**
       * Get Team information
       * @see https://developer.github.com/v3/orgs/teams/#get-team
       * @param {Requestable.callback} [cb] - will receive the team
       * @return {Promise} - the promise for the http request
       */


      _createClass(Team, [{
         key: 'getTeam',
         value: function getTeam(cb) {
            log('Fetching Team ' + this.__teamId);
            return this._request('Get', '/teams/' + this.__teamId, undefined, cb);
         }
      }, {
         key: 'listRepos',
         value: function listRepos(cb) {
            log('Fetching repositories for Team ' + this.__teamId);
            return this._requestAllPages('/teams/' + this.__teamId + '/repos', undefined, cb);
         }
      }, {
         key: 'editTeam',
         value: function editTeam(options, cb) {
            log('Editing Team ' + this.__teamId);
            return this._request('PATCH', '/teams/' + this.__teamId, options, cb);
         }
      }, {
         key: 'listMembers',
         value: function listMembers(options, cb) {
            log('Getting members of Team ' + this.__teamId);
            return this._requestAllPages('/teams/' + this.__teamId + '/members', options, cb);
         }
      }, {
         key: 'getMembership',
         value: function getMembership(username, cb) {
            log('Getting membership of user ' + username + ' in Team ' + this.__teamId);
            return this._request('GET', '/teams/' + this.__teamId + '/memberships/' + username, undefined, cb);
         }
      }, {
         key: 'addMembership',
         value: function addMembership(username, options, cb) {
            log('Adding user ' + username + ' to Team ' + this.__teamId);
            return this._request('PUT', '/teams/' + this.__teamId + '/memberships/' + username, options, cb);
         }
      }, {
         key: 'isManagedRepo',
         value: function isManagedRepo(owner, repo, cb) {
            log('Getting repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
            return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, undefined, cb);
         }
      }, {
         key: 'manageRepo',
         value: function manageRepo(owner, repo, options, cb) {
            log('Adding or Updating repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
            return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, options, cb, 'PUT');
         }
      }, {
         key: 'unmanageRepo',
         value: function unmanageRepo(owner, repo, cb) {
            log('Remove repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
            return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, undefined, cb, 'DELETE');
         }
      }, {
         key: 'deleteTeam',
         value: function deleteTeam(cb) {
            log('Deleting Team ' + this.__teamId);
            return this._request204or404('/teams/' + this.__teamId, undefined, cb, 'DELETE');
         }
      }]);

      return Team;
   }(_Requestable3.default);

   module.exports = Team;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlYW0uanMiXSwibmFtZXMiOlsibG9nIiwiVGVhbSIsInRlYW1JZCIsImF1dGgiLCJhcGlCYXNlIiwiX190ZWFtSWQiLCJjYiIsIl9yZXF1ZXN0IiwidW5kZWZpbmVkIiwiX3JlcXVlc3RBbGxQYWdlcyIsIm9wdGlvbnMiLCJ1c2VybmFtZSIsIm93bmVyIiwicmVwbyIsIl9yZXF1ZXN0MjA0b3I0MDQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTUEsTUFBTSxxQkFBTSxhQUFOLENBQVo7O0FBRUE7Ozs7T0FHTUMsSTs7O0FBQ0g7Ozs7OztBQU1BLG9CQUFZQyxNQUFaLEVBQW9CQyxJQUFwQixFQUEwQkMsT0FBMUIsRUFBbUM7QUFBQTs7QUFBQSxpSEFDMUJELElBRDBCLEVBQ3BCQyxPQURvQjs7QUFFaEMsZUFBS0MsUUFBTCxHQUFnQkgsTUFBaEI7QUFGZ0M7QUFHbEM7O0FBRUQ7Ozs7Ozs7Ozs7aUNBTVFJLEUsRUFBSTtBQUNUTixtQ0FBcUIsS0FBS0ssUUFBMUI7QUFDQSxtQkFBTyxLQUFLRSxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLRixRQUFwQyxFQUFnREcsU0FBaEQsRUFBMkRGLEVBQTNELENBQVA7QUFDRjs7O21DQVFTQSxFLEVBQUk7QUFDWE4sb0RBQXNDLEtBQUtLLFFBQTNDO0FBQ0EsbUJBQU8sS0FBS0ksZ0JBQUwsYUFBZ0MsS0FBS0osUUFBckMsYUFBdURHLFNBQXZELEVBQWtFRixFQUFsRSxDQUFQO0FBQ0Y7OztrQ0FjUUksTyxFQUFTSixFLEVBQUk7QUFDbkJOLGtDQUFvQixLQUFLSyxRQUF6QjtBQUNBLG1CQUFPLEtBQUtFLFFBQUwsQ0FBYyxPQUFkLGNBQWlDLEtBQUtGLFFBQXRDLEVBQWtESyxPQUFsRCxFQUEyREosRUFBM0QsQ0FBUDtBQUNGOzs7cUNBVVdJLE8sRUFBU0osRSxFQUFJO0FBQ3RCTiw2Q0FBK0IsS0FBS0ssUUFBcEM7QUFDQSxtQkFBTyxLQUFLSSxnQkFBTCxhQUFnQyxLQUFLSixRQUFyQyxlQUF5REssT0FBekQsRUFBa0VKLEVBQWxFLENBQVA7QUFDRjs7O3VDQVNhSyxRLEVBQVVMLEUsRUFBSTtBQUN6Qk4sZ0RBQWtDVyxRQUFsQyxpQkFBc0QsS0FBS04sUUFBM0Q7QUFDQSxtQkFBTyxLQUFLRSxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLRixRQUFwQyxxQkFBNERNLFFBQTVELEVBQXdFSCxTQUF4RSxFQUFtRkYsRUFBbkYsQ0FBUDtBQUNGOzs7dUNBWWFLLFEsRUFBVUQsTyxFQUFTSixFLEVBQUk7QUFDbENOLGlDQUFtQlcsUUFBbkIsaUJBQXVDLEtBQUtOLFFBQTVDO0FBQ0EsbUJBQU8sS0FBS0UsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS0YsUUFBcEMscUJBQTRETSxRQUE1RCxFQUF3RUQsT0FBeEUsRUFBaUZKLEVBQWpGLENBQVA7QUFDRjs7O3VDQVVhTSxLLEVBQU9DLEksRUFBTVAsRSxFQUFJO0FBQzVCTixxREFBdUMsS0FBS0ssUUFBNUMsa0JBQWlFTyxLQUFqRSxTQUEwRUMsSUFBMUU7QUFDQSxtQkFBTyxLQUFLQyxnQkFBTCxhQUFnQyxLQUFLVCxRQUFyQyxlQUF1RE8sS0FBdkQsU0FBZ0VDLElBQWhFLEVBQXdFTCxTQUF4RSxFQUFtRkYsRUFBbkYsQ0FBUDtBQUNGOzs7b0NBYVVNLEssRUFBT0MsSSxFQUFNSCxPLEVBQVNKLEUsRUFBSTtBQUNsQ04sZ0VBQWtELEtBQUtLLFFBQXZELGtCQUE0RU8sS0FBNUUsU0FBcUZDLElBQXJGO0FBQ0EsbUJBQU8sS0FBS0MsZ0JBQUwsYUFBZ0MsS0FBS1QsUUFBckMsZUFBdURPLEtBQXZELFNBQWdFQyxJQUFoRSxFQUF3RUgsT0FBeEUsRUFBaUZKLEVBQWpGLEVBQXFGLEtBQXJGLENBQVA7QUFDRjs7O3NDQVVZTSxLLEVBQU9DLEksRUFBTVAsRSxFQUFJO0FBQzNCTixvREFBc0MsS0FBS0ssUUFBM0Msa0JBQWdFTyxLQUFoRSxTQUF5RUMsSUFBekU7QUFDQSxtQkFBTyxLQUFLQyxnQkFBTCxhQUFnQyxLQUFLVCxRQUFyQyxlQUF1RE8sS0FBdkQsU0FBZ0VDLElBQWhFLEVBQXdFTCxTQUF4RSxFQUFtRkYsRUFBbkYsRUFBdUYsUUFBdkYsQ0FBUDtBQUNGOzs7b0NBUVVBLEUsRUFBSTtBQUNaTixtQ0FBcUIsS0FBS0ssUUFBMUI7QUFDQSxtQkFBTyxLQUFLUyxnQkFBTCxhQUFnQyxLQUFLVCxRQUFyQyxFQUFpREcsU0FBakQsRUFBNERGLEVBQTVELEVBQWdFLFFBQWhFLENBQVA7QUFDRjs7Ozs7O0FBR0pTLFVBQU9DLE9BQVAsR0FBaUJmLElBQWpCIiwiZmlsZSI6IlRlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVcclxuICogQGNvcHlyaWdodCAgMjAxNiBNYXR0IFNtaXRoIChEZXZlbG9wbWVudCBTZWVkKVxyXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxyXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xyXG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xyXG5jb25zdCBsb2cgPSBkZWJ1ZygnZ2l0aHViOnRlYW0nKTtcclxuXHJcbi8qKlxyXG4gKiBBIFRlYW0gYWxsb3dzIHNjb3Bpbmcgb2YgQVBJIHJlcXVlc3RzIHRvIGEgcGFydGljdWxhciBHaXRodWIgT3JnYW5pemF0aW9uIFRlYW0uXHJcbiAqL1xyXG5jbGFzcyBUZWFtIGV4dGVuZHMgUmVxdWVzdGFibGUge1xyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgVGVhbS5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFt0ZWFtSWRdIC0gdGhlIGlkIGZvciB0aGUgdGVhbVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIGluZm9ybWF0aW9uIHJlcXVpcmVkIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICovXHJcbiAgIGNvbnN0cnVjdG9yKHRlYW1JZCwgYXV0aCwgYXBpQmFzZSkge1xyXG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcclxuICAgICAgdGhpcy5fX3RlYW1JZCA9IHRlYW1JZDtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEdldCBUZWFtIGluZm9ybWF0aW9uXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNnZXQtdGVhbVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSB0ZWFtXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldFRlYW0oY2IpIHtcclxuICAgICAgbG9nKGBGZXRjaGluZyBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dldCcsIGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfWAsIHVuZGVmaW5lZCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgVGVhbSdzIHJlcG9zaXRvcmllc1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jbGlzdC10ZWFtLXJlcG9zXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RSZXBvcyhjYikge1xyXG4gICAgICBsb2coYEZldGNoaW5nIHJlcG9zaXRvcmllcyBmb3IgVGVhbSAke3RoaXMuX190ZWFtSWR9YCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L3JlcG9zYCwgdW5kZWZpbmVkLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBFZGl0IFRlYW0gaW5mb3JtYXRpb25cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2VkaXQtdGVhbVxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFBhcmFtZXRlcnMgZm9yIHRlYW0gZWRpdFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHRlYW1cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmRlc2NyaXB0aW9uXSAtIFRlYW0gZGVzY3JpcHRpb25cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJlcG9fbmFtZXNdIC0gUmVwb3MgdG8gYWRkIHRoZSB0ZWFtIHRvXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5wcml2YWN5PXNlY3JldF0gLSBUaGUgbGV2ZWwgb2YgcHJpdmFjeSB0aGUgdGVhbSBzaG91bGQgaGF2ZS4gQ2FuIGJlIGVpdGhlciBvbmVcclxuICAgICogb2Y6IGBzZWNyZXRgLCBvciBgY2xvc2VkYFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIHRlYW1cclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZWRpdFRlYW0ob3B0aW9ucywgY2IpIHtcclxuICAgICAgbG9nKGBFZGl0aW5nIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH1gLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSB1c2VycyB3aG8gYXJlIG1lbWJlcnMgb2YgdGhlIFRlYW1cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2xpc3QtdGVhbS1tZW1iZXJzXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gUGFyYW1ldGVycyBmb3IgbGlzdGluZyB0ZWFtIHVzZXJzXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5yb2xlPWFsbF0gLSBjYW4gYmUgb25lIG9mOiBgYWxsYCwgYG1haW50YWluZXJgLCBvciBgbWVtYmVyYFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHVzZXJzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RNZW1iZXJzKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIGxvZyhgR2V0dGluZyBtZW1iZXJzIG9mIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9tZW1iZXJzYCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IFRlYW0gbWVtYmVyc2hpcCBzdGF0dXMgZm9yIGEgdXNlclxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jZ2V0LXRlYW0tbWVtYmVyc2hpcFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgLSBjYW4gYmUgb25lIG9mOiBgYWxsYCwgYG1haW50YWluZXJgLCBvciBgbWVtYmVyYFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtZW1iZXJzaGlwIHN0YXR1cyBvZiBhIHVzZXJcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0TWVtYmVyc2hpcCh1c2VybmFtZSwgY2IpIHtcclxuICAgICAgbG9nKGBHZXR0aW5nIG1lbWJlcnNoaXAgb2YgdXNlciAke3VzZXJuYW1lfSBpbiBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9tZW1iZXJzaGlwcy8ke3VzZXJuYW1lfWAsIHVuZGVmaW5lZCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQWRkIGEgbWVtYmVyIHRvIHRoZSBUZWFtXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNhZGQtdGVhbS1tZW1iZXJzaGlwXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIGNhbiBiZSBvbmUgb2Y6IGBhbGxgLCBgbWFpbnRhaW5lcmAsIG9yIGBtZW1iZXJgXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gUGFyYW1ldGVycyBmb3IgYWRkaW5nIGEgdGVhbSBtZW1iZXJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJvbGU9bWVtYmVyXSAtIFRoZSByb2xlIHRoYXQgdGhpcyB1c2VyIHNob3VsZCBoYXZlIGluIHRoZSB0ZWFtLiBDYW4gYmUgb25lXHJcbiAgICAqIG9mOiBgbWVtYmVyYCwgb3IgYG1haW50YWluZXJgXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lbWJlcnNoaXAgc3RhdHVzIG9mIGFkZGVkIHVzZXJcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgYWRkTWVtYmVyc2hpcCh1c2VybmFtZSwgb3B0aW9ucywgY2IpIHtcclxuICAgICAgbG9nKGBBZGRpbmcgdXNlciAke3VzZXJuYW1lfSB0byBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9tZW1iZXJzaGlwcy8ke3VzZXJuYW1lfWAsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEdldCByZXBvIG1hbmFnZW1lbnQgc3RhdHVzIGZvciB0ZWFtXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNyZW1vdmUtdGVhbS1tZW1iZXJzaGlwXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvd25lciAtIE9yZ2FuaXphdGlvbiBuYW1lXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gUmVwbyBuYW1lXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lbWJlcnNoaXAgc3RhdHVzIG9mIGFkZGVkIHVzZXJcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgaXNNYW5hZ2VkUmVwbyhvd25lciwgcmVwbywgY2IpIHtcclxuICAgICAgbG9nKGBHZXR0aW5nIHJlcG8gbWFuYWdlbWVudCBieSBUZWFtICR7dGhpcy5fX3RlYW1JZH0gZm9yIHJlcG8gJHtvd25lcn0vJHtyZXBvfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9yZXBvcy8ke293bmVyfS8ke3JlcG99YCwgdW5kZWZpbmVkLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBBZGQgb3IgVXBkYXRlIHJlcG8gbWFuYWdlbWVudCBzdGF0dXMgZm9yIHRlYW1cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2FkZC1vci11cGRhdGUtdGVhbS1yZXBvc2l0b3J5XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvd25lciAtIE9yZ2FuaXphdGlvbiBuYW1lXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gUmVwbyBuYW1lXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gUGFyYW1ldGVycyBmb3IgYWRkaW5nIG9yIHVwZGF0aW5nIHJlcG8gbWFuYWdlbWVudCBmb3IgdGhlIHRlYW1cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBlcm1pc3Npb25dIC0gVGhlIHBlcm1pc3Npb24gdG8gZ3JhbnQgdGhlIHRlYW0gb24gdGhpcyByZXBvc2l0b3J5LiBDYW4gYmUgb25lXHJcbiAgICAqIG9mOiBgcHVsbGAsIGBwdXNoYCwgb3IgYGFkbWluYFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtZW1iZXJzaGlwIHN0YXR1cyBvZiBhZGRlZCB1c2VyXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIG1hbmFnZVJlcG8ob3duZXIsIHJlcG8sIG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIGxvZyhgQWRkaW5nIG9yIFVwZGF0aW5nIHJlcG8gbWFuYWdlbWVudCBieSBUZWFtICR7dGhpcy5fX3RlYW1JZH0gZm9yIHJlcG8gJHtvd25lcn0vJHtyZXBvfWApO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9yZXBvcy8ke293bmVyfS8ke3JlcG99YCwgb3B0aW9ucywgY2IsICdQVVQnKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFJlbW92ZSByZXBvIG1hbmFnZW1lbnQgc3RhdHVzIGZvciB0ZWFtXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNyZW1vdmUtdGVhbS1yZXBvc2l0b3J5XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvd25lciAtIE9yZ2FuaXphdGlvbiBuYW1lXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gUmVwbyBuYW1lXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lbWJlcnNoaXAgc3RhdHVzIG9mIGFkZGVkIHVzZXJcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgdW5tYW5hZ2VSZXBvKG93bmVyLCByZXBvLCBjYikge1xyXG4gICAgICBsb2coYFJlbW92ZSByZXBvIG1hbmFnZW1lbnQgYnkgVGVhbSAke3RoaXMuX190ZWFtSWR9IGZvciByZXBvICR7b3duZXJ9LyR7cmVwb31gKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH0vcmVwb3MvJHtvd25lcn0vJHtyZXBvfWAsIHVuZGVmaW5lZCwgY2IsICdERUxFVEUnKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIERlbGV0ZSBUZWFtXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNkZWxldGUtdGVhbVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHJlcG9zaXRvcmllc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBkZWxldGVUZWFtKGNiKSB7XHJcbiAgICAgIGxvZyhgRGVsZXRpbmcgVGVhbSAke3RoaXMuX190ZWFtSWR9YCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0MjA0b3I0MDQoYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9YCwgdW5kZWZpbmVkLCBjYiwgJ0RFTEVURScpO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGVhbTtcclxuIl19
//# sourceMappingURL=Team.js.map
