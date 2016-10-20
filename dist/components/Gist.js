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
      global.Gist = mod.exports;
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

   var Gist = function (_Requestable) {
      _inherits(Gist, _Requestable);

      /**
       * Create a Gist.
       * @param {string} id - the id of the gist (not required when creating a gist)
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */
      function Gist(id, auth, apiBase) {
         _classCallCheck(this, Gist);

         var _this = _possibleConstructorReturn(this, (Gist.__proto__ || Object.getPrototypeOf(Gist)).call(this, auth, apiBase));

         _this.__id = id;
         return _this;
      }

      /**
       * Fetch a gist.
       * @see https://developer.github.com/v3/gists/#get-a-single-gist
       * @param {Requestable.callback} [cb] - will receive the gist
       * @return {Promise} - the Promise for the http request
       */


      _createClass(Gist, [{
         key: 'read',
         value: function read(cb) {
            return this._request('GET', '/gists/' + this.__id, null, cb);
         }
      }, {
         key: 'create',
         value: function create(gist, cb) {
            var _this2 = this;

            return this._request('POST', '/gists', gist, cb).then(function (response) {
               _this2.__id = response.data.id;
               return response;
            });
         }
      }, {
         key: 'delete',
         value: function _delete(cb) {
            return this._request('DELETE', '/gists/' + this.__id, null, cb);
         }
      }, {
         key: 'fork',
         value: function fork(cb) {
            return this._request('POST', '/gists/' + this.__id + '/forks', null, cb);
         }
      }, {
         key: 'update',
         value: function update(gist, cb) {
            return this._request('PATCH', '/gists/' + this.__id, gist, cb);
         }
      }, {
         key: 'star',
         value: function star(cb) {
            return this._request('PUT', '/gists/' + this.__id + '/star', null, cb);
         }
      }, {
         key: 'unstar',
         value: function unstar(cb) {
            return this._request('DELETE', '/gists/' + this.__id + '/star', null, cb);
         }
      }, {
         key: 'isStarred',
         value: function isStarred(cb) {
            return this._request204or404('/gists/' + this.__id + '/star', null, cb);
         }
      }, {
         key: 'listComments',
         value: function listComments(cb) {
            return this._requestAllPages('/gists/' + this.__id + '/comments', null, cb);
         }
      }, {
         key: 'getComment',
         value: function getComment(comment, cb) {
            return this._request('GET', '/gists/' + this.__id + '/comments/' + comment, null, cb);
         }
      }, {
         key: 'createComment',
         value: function createComment(comment, cb) {
            return this._request('POST', '/gists/' + this.__id + '/comments', { body: comment }, cb);
         }
      }, {
         key: 'editComment',
         value: function editComment(comment, body, cb) {
            return this._request('PATCH', '/gists/' + this.__id + '/comments/' + comment, { body: body }, cb);
         }
      }, {
         key: 'deleteComment',
         value: function deleteComment(comment, cb) {
            return this._request('DELETE', '/gists/' + this.__id + '/comments/' + comment, null, cb);
         }
      }]);

      return Gist;
   }(_Requestable3.default);

   module.exports = Gist;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdpc3QuanMiXSwibmFtZXMiOlsiR2lzdCIsImlkIiwiYXV0aCIsImFwaUJhc2UiLCJfX2lkIiwiY2IiLCJfcmVxdWVzdCIsImdpc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiX3JlcXVlc3QyMDRvcjQwNCIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJjb21tZW50IiwiYm9keSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BWU1BLEk7OztBQUNIOzs7Ozs7QUFNQSxvQkFBWUMsRUFBWixFQUFnQkMsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCO0FBQUE7O0FBQUEsaUhBQ3RCRCxJQURzQixFQUNoQkMsT0FEZ0I7O0FBRTVCLGVBQUtDLElBQUwsR0FBWUgsRUFBWjtBQUY0QjtBQUc5Qjs7QUFFRDs7Ozs7Ozs7Ozs4QkFNS0ksRSxFQUFJO0FBQ04sbUJBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS0YsSUFBcEMsRUFBNEMsSUFBNUMsRUFBa0RDLEVBQWxELENBQVA7QUFDRjs7O2dDQVNNRSxJLEVBQU1GLEUsRUFBSTtBQUFBOztBQUNkLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLEVBQXNCLFFBQXRCLEVBQWdDQyxJQUFoQyxFQUFzQ0YsRUFBdEMsRUFDSEcsSUFERyxDQUNFLFVBQUNDLFFBQUQsRUFBYztBQUNqQixzQkFBS0wsSUFBTCxHQUFZSyxTQUFTQyxJQUFULENBQWNULEVBQTFCO0FBQ0Esc0JBQU9RLFFBQVA7QUFDRixhQUpHLENBQVA7QUFLRjs7O2lDQVFNSixFLEVBQUk7QUFDUixtQkFBTyxLQUFLQyxRQUFMLENBQWMsUUFBZCxjQUFrQyxLQUFLRixJQUF2QyxFQUErQyxJQUEvQyxFQUFxREMsRUFBckQsQ0FBUDtBQUNGOzs7OEJBUUlBLEUsRUFBSTtBQUNOLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLGNBQWdDLEtBQUtGLElBQXJDLGFBQW1ELElBQW5ELEVBQXlEQyxFQUF6RCxDQUFQO0FBQ0Y7OztnQ0FTTUUsSSxFQUFNRixFLEVBQUk7QUFDZCxtQkFBTyxLQUFLQyxRQUFMLENBQWMsT0FBZCxjQUFpQyxLQUFLRixJQUF0QyxFQUE4Q0csSUFBOUMsRUFBb0RGLEVBQXBELENBQVA7QUFDRjs7OzhCQVFJQSxFLEVBQUk7QUFDTixtQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLRixJQUFwQyxZQUFpRCxJQUFqRCxFQUF1REMsRUFBdkQsQ0FBUDtBQUNGOzs7Z0NBUU1BLEUsRUFBSTtBQUNSLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtGLElBQXZDLFlBQW9ELElBQXBELEVBQTBEQyxFQUExRCxDQUFQO0FBQ0Y7OzttQ0FRU0EsRSxFQUFJO0FBQ1gsbUJBQU8sS0FBS00sZ0JBQUwsYUFBZ0MsS0FBS1AsSUFBckMsWUFBa0QsSUFBbEQsRUFBd0RDLEVBQXhELENBQVA7QUFDRjs7O3NDQVFZQSxFLEVBQUk7QUFDZCxtQkFBTyxLQUFLTyxnQkFBTCxhQUFnQyxLQUFLUixJQUFyQyxnQkFBc0QsSUFBdEQsRUFBNERDLEVBQTVELENBQVA7QUFDRjs7O29DQVNVUSxPLEVBQVNSLEUsRUFBSTtBQUNyQixtQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLRixJQUFwQyxrQkFBcURTLE9BQXJELEVBQWdFLElBQWhFLEVBQXNFUixFQUF0RSxDQUFQO0FBQ0Y7Ozt1Q0FTYVEsTyxFQUFTUixFLEVBQUk7QUFDeEIsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsY0FBZ0MsS0FBS0YsSUFBckMsZ0JBQXNELEVBQUNVLE1BQU1ELE9BQVAsRUFBdEQsRUFBdUVSLEVBQXZFLENBQVA7QUFDRjs7O3FDQVVXUSxPLEVBQVNDLEksRUFBTVQsRSxFQUFJO0FBQzVCLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxPQUFkLGNBQWlDLEtBQUtGLElBQXRDLGtCQUF1RFMsT0FBdkQsRUFBa0UsRUFBQ0MsTUFBTUEsSUFBUCxFQUFsRSxFQUFnRlQsRUFBaEYsQ0FBUDtBQUNGOzs7dUNBU2FRLE8sRUFBU1IsRSxFQUFJO0FBQ3hCLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtGLElBQXZDLGtCQUF3RFMsT0FBeEQsRUFBbUUsSUFBbkUsRUFBeUVSLEVBQXpFLENBQVA7QUFDRjs7Ozs7O0FBR0pVLFVBQU9DLE9BQVAsR0FBaUJoQixJQUFqQiIsImZpbGUiOiJHaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cclxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cclxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZXF1ZXN0YWJsZSBmcm9tICcuL1JlcXVlc3RhYmxlJztcclxuXHJcbi8qKlxyXG4gKiBBIEdpc3QgY2FuIHJldHJpZXZlIGFuZCBtb2RpZnkgZ2lzdHMuXHJcbiAqL1xyXG5jbGFzcyBHaXN0IGV4dGVuZHMgUmVxdWVzdGFibGUge1xyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgR2lzdC5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGlkIG9mIHRoZSBnaXN0IChub3QgcmVxdWlyZWQgd2hlbiBjcmVhdGluZyBhIGdpc3QpXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IoaWQsIGF1dGgsIGFwaUJhc2UpIHtcclxuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XHJcbiAgICAgIHRoaXMuX19pZCA9IGlkO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRmV0Y2ggYSBnaXN0LlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2dldC1hLXNpbmdsZS1naXN0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGdpc3RcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgcmVhZChjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9naXN0cy8ke3RoaXMuX19pZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgZ2lzdC5cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzLyNjcmVhdGUtYS1naXN0XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBnaXN0IC0gdGhlIGRhdGEgZm9yIHRoZSBuZXcgZ2lzdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgZ2lzdCB1cG9uIGNyZWF0aW9uXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGNyZWF0ZShnaXN0LCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsICcvZ2lzdHMnLCBnaXN0LCBjYilcclxuICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX19pZCA9IHJlc3BvbnNlLmRhdGEuaWQ7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBEZWxldGUgYSBnaXN0LlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2RlbGV0ZS1hLWdpc3RcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IHN1Y2NlZWRzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGRlbGV0ZShjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9naXN0cy8ke3RoaXMuX19pZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBGb3JrIGEgZ2lzdC5cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzLyNmb3JrLWEtZ2lzdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gdGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCByZWNlaXZlIHRoZSBnaXN0XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGZvcmsoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfS9mb3Jrc2AsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFVwZGF0ZSBhIGdpc3QuXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jZWRpdC1hLWdpc3RcclxuICAgICogQHBhcmFtIHtPYmplY3R9IGdpc3QgLSB0aGUgbmV3IGRhdGEgZm9yIHRoZSBnaXN0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB0aGUgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgQVBJIHJlc3VsdFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICB1cGRhdGUoZ2lzdCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9naXN0cy8ke3RoaXMuX19pZH1gLCBnaXN0LCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTdGFyIGEgZ2lzdC5cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzLyNzdGFyLWEtZ2lzdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBzdGFyKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQVVQnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfS9zdGFyYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogVW5zdGFyIGEgZ2lzdC5cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzLyN1bnN0YXItYS1naXN0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBpcyBzdWNjZXNzZnVsXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIHVuc3RhcihjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9naXN0cy8ke3RoaXMuX19pZH0vc3RhcmAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENoZWNrIGlmIGEgZ2lzdCBpcyBzdGFycmVkIGJ5IHRoZSB1c2VyLlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2NoZWNrLWlmLWEtZ2lzdC1pcy1zdGFycmVkXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgZ2lzdCBpcyBzdGFycmVkIGFuZCBmYWxzZSBpZiB0aGUgZ2lzdCBpcyBub3Qgc3RhcnJlZFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBpc1N0YXJyZWQoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL2dpc3RzLyR7dGhpcy5fX2lkfS9zdGFyYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgZ2lzdCdzIGNvbW1lbnRzXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy9jb21tZW50cy8jbGlzdC1jb21tZW50cy1vbi1hLWdpc3RcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgY29tbWVudHNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdENvbW1lbnRzKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9naXN0cy8ke3RoaXMuX19pZH0vY29tbWVudHNgLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBGZXRjaCBvbmUgb2YgdGhlIGdpc3QncyBjb21tZW50c1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvY29tbWVudHMvI2dldC1hLXNpbmdsZS1jb21tZW50XHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb21tZW50IC0gdGhlIGlkIG9mIHRoZSBjb21tZW50XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1lbnRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0Q29tbWVudChjb21tZW50LCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9naXN0cy8ke3RoaXMuX19pZH0vY29tbWVudHMvJHtjb21tZW50fWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENvbW1lbnQgb24gYSBnaXN0XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy9jb21tZW50cy8jY3JlYXRlLWEtY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCAtIHRoZSBjb21tZW50IHRvIGFkZFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gdGhlIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIEFQSSByZXN1bHRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlQ29tbWVudChjb21tZW50LCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvZ2lzdHMvJHt0aGlzLl9faWR9L2NvbW1lbnRzYCwge2JvZHk6IGNvbW1lbnR9LCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBFZGl0IGEgY29tbWVudCBvbiB0aGUgZ2lzdFxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvY29tbWVudHMvI2VkaXQtYS1jb21tZW50XHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb21tZW50IC0gdGhlIGlkIG9mIHRoZSBjb21tZW50XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IC0gdGhlIG5ldyBjb21tZW50XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1vZGlmaWVkIGNvbW1lbnRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZWRpdENvbW1lbnQoY29tbWVudCwgYm9keSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9naXN0cy8ke3RoaXMuX19pZH0vY29tbWVudHMvJHtjb21tZW50fWAsIHtib2R5OiBib2R5fSwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRGVsZXRlIGEgY29tbWVudCBvbiB0aGUgZ2lzdC5cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpc3RzL2NvbW1lbnRzLyNkZWxldGUtYS1jb21tZW50XHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb21tZW50IC0gdGhlIGlkIG9mIHRoZSBjb21tZW50XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBkZWxldGVDb21tZW50KGNvbW1lbnQsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL2dpc3RzLyR7dGhpcy5fX2lkfS9jb21tZW50cy8ke2NvbW1lbnR9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2lzdDtcclxuIl19
//# sourceMappingURL=Gist.js.map
