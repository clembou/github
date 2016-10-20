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
      global.Issue = mod.exports;
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

   var Issue = function (_Requestable) {
      _inherits(Issue, _Requestable);

      /**
       * Create a new Issue
       * @param {string} repository - the full name of the repository (`:user/:repo`) to get issues for
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */
      function Issue(repository, auth, apiBase) {
         _classCallCheck(this, Issue);

         var _this = _possibleConstructorReturn(this, (Issue.__proto__ || Object.getPrototypeOf(Issue)).call(this, auth, apiBase));

         _this.__repository = repository;
         return _this;
      }

      /**
       * Create a new issue
       * @see https://developer.github.com/v3/issues/#create-an-issue
       * @param {Object} issueData - the issue to create
       * @param {Requestable.callback} [cb] - will receive the created issue
       * @return {Promise} - the promise for the http request
       */


      _createClass(Issue, [{
         key: 'createIssue',
         value: function createIssue(issueData, cb) {
            return this._request('POST', '/repos/' + this.__repository + '/issues', issueData, cb);
         }
      }, {
         key: 'listIssues',
         value: function listIssues(options, cb) {
            return this._requestAllPages('/repos/' + this.__repository + '/issues', options, cb);
         }
      }, {
         key: 'listIssueEvents',
         value: function listIssueEvents(issue, cb) {
            return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/events', null, cb);
         }
      }, {
         key: 'listIssueComments',
         value: function listIssueComments(issue, cb) {
            return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/comments', null, cb);
         }
      }, {
         key: 'getIssueComment',
         value: function getIssueComment(id, cb) {
            return this._request('GET', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
         }
      }, {
         key: 'createIssueComment',
         value: function createIssueComment(issue, comment, cb) {
            return this._request('POST', '/repos/' + this.__repository + '/issues/' + issue + '/comments', { body: comment }, cb);
         }
      }, {
         key: 'editIssueComment',
         value: function editIssueComment(id, comment, cb) {
            return this._request('PATCH', '/repos/' + this.__repository + '/issues/comments/' + id, { body: comment }, cb);
         }
      }, {
         key: 'deleteIssueComment',
         value: function deleteIssueComment(id, cb) {
            return this._request('DELETE', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
         }
      }, {
         key: 'editIssue',
         value: function editIssue(issue, issueData, cb) {
            return this._request('PATCH', '/repos/' + this.__repository + '/issues/' + issue, issueData, cb);
         }
      }, {
         key: 'getIssue',
         value: function getIssue(issue, cb) {
            return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue, null, cb);
         }
      }, {
         key: 'listMilestones',
         value: function listMilestones(options, cb) {
            return this._request('GET', '/repos/' + this.__repository + '/milestones', options, cb);
         }
      }, {
         key: 'getMilestone',
         value: function getMilestone(milestone, cb) {
            return this._request('GET', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
         }
      }, {
         key: 'createMilestone',
         value: function createMilestone(milestoneData, cb) {
            return this._request('POST', '/repos/' + this.__repository + '/milestones', milestoneData, cb);
         }
      }, {
         key: 'editMilestone',
         value: function editMilestone(milestone, milestoneData, cb) {
            return this._request('PATCH', '/repos/' + this.__repository + '/milestones/' + milestone, milestoneData, cb);
         }
      }, {
         key: 'deleteMilestone',
         value: function deleteMilestone(milestone, cb) {
            return this._request('DELETE', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
         }
      }, {
         key: 'createLabel',
         value: function createLabel(labelData, cb) {
            return this._request('POST', '/repos/' + this.__repository + '/labels', labelData, cb);
         }
      }]);

      return Issue;
   }(_Requestable3.default);

   module.exports = Issue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIklzc3VlLmpzIl0sIm5hbWVzIjpbIklzc3VlIiwicmVwb3NpdG9yeSIsImF1dGgiLCJhcGlCYXNlIiwiX19yZXBvc2l0b3J5IiwiaXNzdWVEYXRhIiwiY2IiLCJfcmVxdWVzdCIsIm9wdGlvbnMiLCJfcmVxdWVzdEFsbFBhZ2VzIiwiaXNzdWUiLCJpZCIsImNvbW1lbnQiLCJib2R5IiwibWlsZXN0b25lIiwibWlsZXN0b25lRGF0YSIsImxhYmVsRGF0YSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BWU1BLEs7OztBQUNIOzs7Ozs7QUFNQSxxQkFBWUMsVUFBWixFQUF3QkMsSUFBeEIsRUFBOEJDLE9BQTlCLEVBQXVDO0FBQUE7O0FBQUEsbUhBQzlCRCxJQUQ4QixFQUN4QkMsT0FEd0I7O0FBRXBDLGVBQUtDLFlBQUwsR0FBb0JILFVBQXBCO0FBRm9DO0FBR3RDOztBQUVEOzs7Ozs7Ozs7OztxQ0FPWUksUyxFQUFXQyxFLEVBQUk7QUFDeEIsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsY0FBZ0MsS0FBS0gsWUFBckMsY0FBNERDLFNBQTVELEVBQXVFQyxFQUF2RSxDQUFQO0FBQ0Y7OztvQ0FTVUUsTyxFQUFTRixFLEVBQUk7QUFDckIsbUJBQU8sS0FBS0csZ0JBQUwsYUFBZ0MsS0FBS0wsWUFBckMsY0FBNERJLE9BQTVELEVBQXFFRixFQUFyRSxDQUFQO0FBQ0Y7Ozt5Q0FTZUksSyxFQUFPSixFLEVBQUk7QUFDeEIsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS0gsWUFBcEMsZ0JBQTJETSxLQUEzRCxjQUEyRSxJQUEzRSxFQUFpRkosRUFBakYsQ0FBUDtBQUNGOzs7MkNBU2lCSSxLLEVBQU9KLEUsRUFBSTtBQUMxQixtQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLSCxZQUFwQyxnQkFBMkRNLEtBQTNELGdCQUE2RSxJQUE3RSxFQUFtRkosRUFBbkYsQ0FBUDtBQUNGOzs7eUNBU2VLLEUsRUFBSUwsRSxFQUFJO0FBQ3JCLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtILFlBQXBDLHlCQUFvRU8sRUFBcEUsRUFBMEUsSUFBMUUsRUFBZ0ZMLEVBQWhGLENBQVA7QUFDRjs7OzRDQVVrQkksSyxFQUFPRSxPLEVBQVNOLEUsRUFBSTtBQUNwQyxtQkFBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxjQUFnQyxLQUFLSCxZQUFyQyxnQkFBNERNLEtBQTVELGdCQUE4RSxFQUFDRyxNQUFNRCxPQUFQLEVBQTlFLEVBQStGTixFQUEvRixDQUFQO0FBQ0Y7OzswQ0FVZ0JLLEUsRUFBSUMsTyxFQUFTTixFLEVBQUk7QUFDL0IsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLE9BQWQsY0FBaUMsS0FBS0gsWUFBdEMseUJBQXNFTyxFQUF0RSxFQUE0RSxFQUFDRSxNQUFNRCxPQUFQLEVBQTVFLEVBQTZGTixFQUE3RixDQUFQO0FBQ0Y7Ozs0Q0FTa0JLLEUsRUFBSUwsRSxFQUFJO0FBQ3hCLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtILFlBQXZDLHlCQUF1RU8sRUFBdkUsRUFBNkUsSUFBN0UsRUFBbUZMLEVBQW5GLENBQVA7QUFDRjs7O21DQVVTSSxLLEVBQU9MLFMsRUFBV0MsRSxFQUFJO0FBQzdCLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxPQUFkLGNBQWlDLEtBQUtILFlBQXRDLGdCQUE2RE0sS0FBN0QsRUFBc0VMLFNBQXRFLEVBQWlGQyxFQUFqRixDQUFQO0FBQ0Y7OztrQ0FTUUksSyxFQUFPSixFLEVBQUk7QUFDakIsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS0gsWUFBcEMsZ0JBQTJETSxLQUEzRCxFQUFvRSxJQUFwRSxFQUEwRUosRUFBMUUsQ0FBUDtBQUNGOzs7d0NBU2NFLE8sRUFBU0YsRSxFQUFJO0FBQ3pCLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtILFlBQXBDLGtCQUErREksT0FBL0QsRUFBd0VGLEVBQXhFLENBQVA7QUFDRjs7O3NDQVNZUSxTLEVBQVdSLEUsRUFBSTtBQUN6QixtQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLSCxZQUFwQyxvQkFBK0RVLFNBQS9ELEVBQTRFLElBQTVFLEVBQWtGUixFQUFsRixDQUFQO0FBQ0Y7Ozt5Q0FTZVMsYSxFQUFlVCxFLEVBQUk7QUFDaEMsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsY0FBZ0MsS0FBS0gsWUFBckMsa0JBQWdFVyxhQUFoRSxFQUErRVQsRUFBL0UsQ0FBUDtBQUNGOzs7dUNBVWFRLFMsRUFBV0MsYSxFQUFlVCxFLEVBQUk7QUFDekMsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLE9BQWQsY0FBaUMsS0FBS0gsWUFBdEMsb0JBQWlFVSxTQUFqRSxFQUE4RUMsYUFBOUUsRUFBNkZULEVBQTdGLENBQVA7QUFDRjs7O3lDQVNlUSxTLEVBQVdSLEUsRUFBSTtBQUM1QixtQkFBTyxLQUFLQyxRQUFMLENBQWMsUUFBZCxjQUFrQyxLQUFLSCxZQUF2QyxvQkFBa0VVLFNBQWxFLEVBQStFLElBQS9FLEVBQXFGUixFQUFyRixDQUFQO0FBQ0Y7OztxQ0FTV1UsUyxFQUFXVixFLEVBQUk7QUFDeEIsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsY0FBZ0MsS0FBS0gsWUFBckMsY0FBNERZLFNBQTVELEVBQXVFVixFQUF2RSxDQUFQO0FBQ0Y7Ozs7OztBQUdKVyxVQUFPQyxPQUFQLEdBQWlCbEIsS0FBakIiLCJmaWxlIjoiSXNzdWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVcclxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxyXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxyXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xyXG5cclxuLyoqXHJcbiAqIElzc3VlIHdyYXBzIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGdldCBpc3N1ZXMgZm9yIHJlcG9zaXRvcmllc1xyXG4gKi9cclxuY2xhc3MgSXNzdWUgZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgSXNzdWVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG9zaXRvcnkgLSB0aGUgZnVsbCBuYW1lIG9mIHRoZSByZXBvc2l0b3J5IChgOnVzZXIvOnJlcG9gKSB0byBnZXQgaXNzdWVzIGZvclxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIGluZm9ybWF0aW9uIHJlcXVpcmVkIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWJcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcclxuICAgICovXHJcbiAgIGNvbnN0cnVjdG9yKHJlcG9zaXRvcnksIGF1dGgsIGFwaUJhc2UpIHtcclxuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XHJcbiAgICAgIHRoaXMuX19yZXBvc2l0b3J5ID0gcmVwb3NpdG9yeTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBpc3N1ZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzLyNjcmVhdGUtYW4taXNzdWVcclxuICAgICogQHBhcmFtIHtPYmplY3R9IGlzc3VlRGF0YSAtIHRoZSBpc3N1ZSB0byBjcmVhdGVcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY3JlYXRlZCBpc3N1ZVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVJc3N1ZShpc3N1ZURhdGEsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXNgLCBpc3N1ZURhdGEsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIGlzc3VlcyBmb3IgdGhlIHJlcG9zaXRvcnlcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy8jbGlzdC1pc3N1ZXMtZm9yLWEtcmVwb3NpdG9yeVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGZpbHRlcmluZyBvcHRpb25zXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIGlzc3Vlc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0SXNzdWVzKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXNgLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSBldmVudHMgZm9yIGFuIGlzc3VlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvZXZlbnRzLyNsaXN0LWV2ZW50cy1mb3ItYW4taXNzdWVcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlzc3VlIHRvIGdldCBldmVudHMgZm9yXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgZXZlbnRzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RJc3N1ZUV2ZW50cyhpc3N1ZSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9L2V2ZW50c2AsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgY29tbWVudHMgb24gYW4gaXNzdWVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jbGlzdC1jb21tZW50cy1vbi1hbi1pc3N1ZVxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaWQgb2YgdGhlIGlzc3VlIHRvIGdldCBjb21tZW50cyBmcm9tXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1lbnRzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RJc3N1ZUNvbW1lbnRzKGlzc3VlLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX0vY29tbWVudHNgLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgYSBzaW5nbGUgY29tbWVudCBvbiBhbiBpc3N1ZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2NvbW1lbnRzLyNnZXQtYS1zaW5nbGUtY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBnZXRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWVudFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRJc3N1ZUNvbW1lbnQoaWQsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy9jb21tZW50cy8ke2lkfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENvbW1lbnQgb24gYW4gaXNzdWVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jY3JlYXRlLWEtY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaWQgb2YgdGhlIGlzc3VlIHRvIGNvbW1lbnQgb25cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgLSB0aGUgY29tbWVudCB0byBhZGRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY3JlYXRlZCBjb21tZW50XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGNyZWF0ZUlzc3VlQ29tbWVudChpc3N1ZSwgY29tbWVudCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfS9jb21tZW50c2AsIHtib2R5OiBjb21tZW50fSwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRWRpdCBhIGNvbW1lbnQgb24gYW4gaXNzdWVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jZWRpdC1hLWNvbW1lbnRcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGNvbW1lbnQgaWQgdG8gZWRpdFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCAtIHRoZSBjb21tZW50IHRvIGVkaXRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgZWRpdGVkIGNvbW1lbnRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZWRpdElzc3VlQ29tbWVudChpZCwgY29tbWVudCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvY29tbWVudHMvJHtpZH1gLCB7Ym9keTogY29tbWVudH0sIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIERlbGV0ZSBhIGNvbW1lbnQgb24gYW4gaXNzdWVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jZGVsZXRlLWEtY29tbWVudFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBkZWxldGVcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZGVsZXRlSXNzdWVDb21tZW50KGlkLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvY29tbWVudHMvJHtpZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBFZGl0IGFuIGlzc3VlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2VkaXQtYW4taXNzdWVcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlzc3VlIG51bWJlciB0byBlZGl0XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpc3N1ZURhdGEgLSB0aGUgbmV3IGlzc3VlIGRhdGFcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgaXNzdWVcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZWRpdElzc3VlKGlzc3VlLCBpc3N1ZURhdGEsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9YCwgaXNzdWVEYXRhLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgYSBwYXJ0aWN1bGFyIGlzc3VlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2dldC1hLXNpbmdsZS1pc3N1ZVxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaXNzdWUgbnVtYmVyIHRvIGZldGNoXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGlzc3VlXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldElzc3VlKGlzc3VlLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSBtaWxlc3RvbmVzIGZvciB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL21pbGVzdG9uZXMvI2xpc3QtbWlsZXN0b25lcy1mb3ItYS1yZXBvc2l0b3J5XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZmlsdGVyaW5nIG9wdGlvbnNcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgbWlsZXN0b25lc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0TWlsZXN0b25lcyhvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzYCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IGEgbWlsZXN0b25lXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jZ2V0LWEtc2luZ2xlLW1pbGVzdG9uZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWlsZXN0b25lIC0gdGhlIGlkIG9mIHRoZSBtaWxlc3RvbmUgdG8gZmV0Y2hcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgbWlsZXN0b25lc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRNaWxlc3RvbmUobWlsZXN0b25lLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzLyR7bWlsZXN0b25lfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyBtaWxlc3RvbmVcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyNjcmVhdGUtYS1taWxlc3RvbmVcclxuICAgICogQHBhcmFtIHtPYmplY3R9IG1pbGVzdG9uZURhdGEgLSB0aGUgbWlsZXN0b25lIGRlZmluaXRpb25cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgbWlsZXN0b25lc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVNaWxlc3RvbmUobWlsZXN0b25lRGF0YSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXNgLCBtaWxlc3RvbmVEYXRhLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBFZGl0IGEgbWlsZXN0b25lXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jdXBkYXRlLWEtbWlsZXN0b25lXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBlZGl0XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBtaWxlc3RvbmVEYXRhIC0gdGhlIHVwZGF0ZXMgdG8gbWFrZSB0byB0aGUgbWlsZXN0b25lXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIG1pbGVzdG9uZXNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZWRpdE1pbGVzdG9uZShtaWxlc3RvbmUsIG1pbGVzdG9uZURhdGEsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lcy8ke21pbGVzdG9uZX1gLCBtaWxlc3RvbmVEYXRhLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBEZWxldGUgYSBtaWxlc3RvbmUgKHRoaXMgaXMgZGlzdGluY3QgZnJvbSBjbG9zaW5nIGEgbWlsZXN0b25lKVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL21pbGVzdG9uZXMvI2RlbGV0ZS1hLW1pbGVzdG9uZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWlsZXN0b25lIC0gdGhlIGlkIG9mIHRoZSBtaWxlc3RvbmUgdG8gZGVsZXRlXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIG1pbGVzdG9uZXNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZGVsZXRlTWlsZXN0b25lKG1pbGVzdG9uZSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lcy8ke21pbGVzdG9uZX1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgbGFiZWxcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9sYWJlbHMvI2NyZWF0ZS1hLWxhYmVsXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBsYWJlbERhdGEgLSB0aGUgbGFiZWwgZGVmaW5pdGlvblxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBsYWJlbFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVMYWJlbChsYWJlbERhdGEsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHNgLCBsYWJlbERhdGEsIGNiKTtcclxuICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElzc3VlO1xyXG4iXX0=
//# sourceMappingURL=Issue.js.map
