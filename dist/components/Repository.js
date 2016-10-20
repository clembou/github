(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define(['module', './Requestable', 'utf8', 'js-base64', 'debug'], factory);
   } else if (typeof exports !== "undefined") {
      factory(module, require('./Requestable'), require('utf8'), require('js-base64'), require('debug'));
   } else {
      var mod = {
         exports: {}
      };
      factory(mod, global.Requestable, global.utf8, global.jsBase64, global.debug);
      global.Repository = mod.exports;
   }
})(this, function (module, _Requestable2, _utf, _jsBase, _debug) {
   'use strict';

   var _Requestable3 = _interopRequireDefault(_Requestable2);

   var _utf2 = _interopRequireDefault(_utf);

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

   var log = (0, _debug2.default)('github:repository');

   /**
    * Respository encapsulates the functionality to create, query, and modify files.
    */

   var Repository = function (_Requestable) {
      _inherits(Repository, _Requestable);

      /**
       * Create a Repository.
       * @param {string} fullname - the full name of the repository
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */
      function Repository(fullname, auth, apiBase) {
         _classCallCheck(this, Repository);

         var _this = _possibleConstructorReturn(this, (Repository.__proto__ || Object.getPrototypeOf(Repository)).call(this, auth, apiBase));

         _this.__fullname = fullname;
         _this.__currentTree = {
            branch: null,
            sha: null
         };
         return _this;
      }

      /**
       * Get a reference
       * @see https://developer.github.com/v3/git/refs/#get-a-reference
       * @param {string} ref - the reference to get
       * @param {Requestable.callback} [cb] - will receive the reference's refSpec or a list of refSpecs that match `ref`
       * @return {Promise} - the promise for the http request
       */


      _createClass(Repository, [{
         key: 'getRef',
         value: function getRef(ref, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/git/refs/' + ref, null, cb);
         }
      }, {
         key: 'createRef',
         value: function createRef(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/git/refs', options, cb);
         }
      }, {
         key: 'deleteRef',
         value: function deleteRef(ref, cb) {
            return this._request('DELETE', '/repos/' + this.__fullname + '/git/refs/' + ref, null, cb);
         }
      }, {
         key: 'deleteRepo',
         value: function deleteRepo(cb) {
            return this._request('DELETE', '/repos/' + this.__fullname, null, cb);
         }
      }, {
         key: 'listTags',
         value: function listTags(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/tags', null, cb);
         }
      }, {
         key: 'listPullRequests',
         value: function listPullRequests(options, cb) {
            options = options || {};
            return this._request('GET', '/repos/' + this.__fullname + '/pulls', options, cb);
         }
      }, {
         key: 'getPullRequest',
         value: function getPullRequest(number, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/pulls/' + number, null, cb);
         }
      }, {
         key: 'listPullRequestFiles',
         value: function listPullRequestFiles(number, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/pulls/' + number + '/files', null, cb);
         }
      }, {
         key: 'compareBranches',
         value: function compareBranches(base, head, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/compare/' + base + '...' + head, null, cb);
         }
      }, {
         key: 'listBranches',
         value: function listBranches(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/branches', null, cb);
         }
      }, {
         key: 'getBlob',
         value: function getBlob(sha, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/git/blobs/' + sha, null, cb, 'raw');
         }
      }, {
         key: 'getBranch',
         value: function getBranch(branch, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/branches/' + branch, null, cb);
         }
      }, {
         key: 'getCommit',
         value: function getCommit(sha, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/git/commits/' + sha, null, cb);
         }
      }, {
         key: 'listCommits',
         value: function listCommits(options, cb) {
            options = options || {};

            options.since = this._dateToISO(options.since);
            options.until = this._dateToISO(options.until);

            return this._request('GET', '/repos/' + this.__fullname + '/commits', options, cb);
         }
      }, {
         key: 'getSingleCommit',
         value: function getSingleCommit(ref, cb) {
            ref = ref || '';
            return this._request('GET', '/repos/' + this.__fullname + '/commits/' + ref, null, cb);
         }
      }, {
         key: 'getSha',
         value: function getSha(branch, path, cb) {
            branch = branch ? '?ref=' + branch : '';
            return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path + branch, null, cb);
         }
      }, {
         key: 'listStatuses',
         value: function listStatuses(sha, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/commits/' + sha + '/statuses', null, cb);
         }
      }, {
         key: 'getTree',
         value: function getTree(treeSHA, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/git/trees/' + treeSHA, null, cb);
         }
      }, {
         key: 'createBlob',
         value: function createBlob(content, cb) {
            var postBody = this._getContentObject(content);

            log('sending content', postBody);
            return this._request('POST', '/repos/' + this.__fullname + '/git/blobs', postBody, cb);
         }
      }, {
         key: '_getContentObject',
         value: function _getContentObject(content) {
            if (typeof content === 'string') {
               log('contet is a string');
               return {
                  content: _utf2.default.encode(content),
                  encoding: 'utf-8'
               };
            } else if (typeof Buffer !== 'undefined' && content instanceof Buffer) {
               log('We appear to be in Node');
               return {
                  content: content.toString('base64'),
                  encoding: 'base64'
               };
            } else if (typeof Blob !== 'undefined' && content instanceof Blob) {
               log('We appear to be in the browser');
               return {
                  content: _jsBase.Base64.encode(content),
                  encoding: 'base64'
               };
            } else {
               // eslint-disable-line
               log('Not sure what this content is: ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)) + ', ' + JSON.stringify(content));
               throw new Error('Unknown content passed to postBlob. Must be string or Buffer (node) or Blob (web)');
            }
         }
      }, {
         key: 'updateTree',
         value: function updateTree(baseTreeSHA, path, blobSHA, cb) {
            var newTree = {
               base_tree: baseTreeSHA, // eslint-disable-line
               tree: [{
                  path: path,
                  sha: blobSHA,
                  mode: '100644',
                  type: 'blob'
               }]
            };

            return this._request('POST', '/repos/' + this.__fullname + '/git/trees', newTree, cb);
         }
      }, {
         key: 'createTree',
         value: function createTree(tree, baseSHA, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/git/trees', {
               tree: tree,
               base_tree: baseSHA // eslint-disable-line
            }, cb);
         }
      }, {
         key: 'commit',
         value: function commit(parent, tree, message, cb) {
            var _this2 = this;

            var data = {
               message: message,
               tree: tree,
               parents: [parent]
            };

            return this._request('POST', '/repos/' + this.__fullname + '/git/commits', data, cb).then(function (response) {
               _this2.__currentTree.sha = response.data.sha; // Update latest commit
               return response;
            });
         }
      }, {
         key: 'updateHead',
         value: function updateHead(ref, commitSHA, force, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/git/refs/' + ref, {
               sha: commitSHA,
               force: force
            }, cb);
         }
      }, {
         key: 'getDetails',
         value: function getDetails(cb) {
            return this._request('GET', '/repos/' + this.__fullname, null, cb);
         }
      }, {
         key: 'getContributors',
         value: function getContributors(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/stats/contributors', null, cb);
         }
      }, {
         key: 'getCollaborators',
         value: function getCollaborators(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/collaborators', null, cb);
         }
      }, {
         key: 'isCollaborator',
         value: function isCollaborator(username, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/collaborators/' + username, null, cb);
         }
      }, {
         key: 'getContents',
         value: function getContents(ref, path, raw, cb) {
            path = path ? '' + encodeURI(path) : '';
            return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path, {
               ref: ref
            }, cb, raw);
         }
      }, {
         key: 'getReadme',
         value: function getReadme(ref, raw, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/readme', {
               ref: ref
            }, cb, raw);
         }
      }, {
         key: 'fork',
         value: function fork(cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/forks', null, cb);
         }
      }, {
         key: 'listForks',
         value: function listForks(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/forks', null, cb);
         }
      }, {
         key: 'createBranch',
         value: function createBranch(oldBranch, newBranch, cb) {
            var _this3 = this;

            if (typeof newBranch === 'function') {
               cb = newBranch;
               newBranch = oldBranch;
               oldBranch = 'master';
            }

            return this.getRef('heads/' + oldBranch).then(function (response) {
               var sha = response.data.object.sha;
               return _this3.createRef({
                  sha: sha,
                  ref: 'refs/heads/' + newBranch
               }, cb);
            });
         }
      }, {
         key: 'createPullRequest',
         value: function createPullRequest(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/pulls', options, cb);
         }
      }, {
         key: 'updatePullRequst',
         value: function updatePullRequst(number, options, cb) {
            log('Deprecated: This method contains a typo and it has been deprecated. It will be removed in next major version. Use updatePullRequest() instead.');

            return this.updatePullRequest(number, options, cb);
         }
      }, {
         key: 'updatePullRequest',
         value: function updatePullRequest(number, options, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/pulls/' + number, options, cb);
         }
      }, {
         key: 'listHooks',
         value: function listHooks(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/hooks', null, cb);
         }
      }, {
         key: 'getHook',
         value: function getHook(id, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/hooks/' + id, null, cb);
         }
      }, {
         key: 'createHook',
         value: function createHook(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/hooks', options, cb);
         }
      }, {
         key: 'updateHook',
         value: function updateHook(id, options, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/hooks/' + id, options, cb);
         }
      }, {
         key: 'deleteHook',
         value: function deleteHook(id, cb) {
            return this._request('DELETE', this.__fullname + '/hooks/' + id, null, cb);
         }
      }, {
         key: 'listKeys',
         value: function listKeys(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/keys', null, cb);
         }
      }, {
         key: 'getKey',
         value: function getKey(id, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/keys/' + id, null, cb);
         }
      }, {
         key: 'createKey',
         value: function createKey(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/keys', options, cb);
         }
      }, {
         key: 'deleteKey',
         value: function deleteKey(id, cb) {
            return this._request('DELETE', '/repos/' + this.__fullname + '/keys/' + id, null, cb);
         }
      }, {
         key: 'deleteFile',
         value: function deleteFile(branch, path, cb) {
            var _this4 = this;

            return this.getSha(branch, path).then(function (response) {
               var deleteCommit = {
                  message: 'Delete the file at \'' + path + '\'',
                  sha: response.data.sha,
                  branch: branch
               };
               return _this4._request('DELETE', '/repos/' + _this4.__fullname + '/contents/' + path, deleteCommit, cb);
            });
         }
      }, {
         key: 'move',
         value: function move(branch, oldPath, newPath, cb) {
            var _this5 = this;

            var oldSha = void 0;
            return this.getRef('heads/' + branch).then(function (_ref) {
               var object = _ref.data.object;
               return _this5.getTree(object.sha + '?recursive=true');
            }).then(function (_ref2) {
               var _ref2$data = _ref2.data;
               var tree = _ref2$data.tree;
               var sha = _ref2$data.sha;

               oldSha = sha;
               var newTree = tree.map(function (ref) {
                  if (ref.path === oldPath) {
                     ref.path = newPath;
                  }
                  if (ref.type === 'tree') {
                     delete ref.sha;
                  }
                  return ref;
               });
               return _this5.createTree(newTree);
            }).then(function (_ref3) {
               var tree = _ref3.data;
               return _this5.commit(oldSha, tree.sha, 'Renamed \'' + oldPath + '\' to \'' + newPath + '\'');
            }).then(function (_ref4) {
               var commit = _ref4.data;
               return _this5.updateHead('heads/' + branch, commit.sha, true, cb);
            });
         }
      }, {
         key: 'writeFile',
         value: function writeFile(branch, path, content, message, options, cb) {
            var _this6 = this;

            if (typeof options === 'function') {
               cb = options;
               options = {};
            }
            var filePath = path ? encodeURI(path) : '';
            var shouldEncode = options.encode !== false;
            var commit = {
               branch: branch,
               message: message,
               author: options.author,
               committer: options.committer,
               content: shouldEncode ? _jsBase.Base64.encode(content) : content
            };

            return this.getSha(branch, filePath).then(function (response) {
               commit.sha = response.data.sha;
               return _this6._request('PUT', '/repos/' + _this6.__fullname + '/contents/' + filePath, commit, cb);
            }, function () {
               return _this6._request('PUT', '/repos/' + _this6.__fullname + '/contents/' + filePath, commit, cb);
            });
         }
      }, {
         key: 'isStarred',
         value: function isStarred(cb) {
            return this._request204or404('/user/starred/' + this.__fullname, null, cb);
         }
      }, {
         key: 'star',
         value: function star(cb) {
            return this._request('PUT', '/user/starred/' + this.__fullname, null, cb);
         }
      }, {
         key: 'unstar',
         value: function unstar(cb) {
            return this._request('DELETE', '/user/starred/' + this.__fullname, null, cb);
         }
      }, {
         key: 'createRelease',
         value: function createRelease(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/releases', options, cb);
         }
      }, {
         key: 'updateRelease',
         value: function updateRelease(id, options, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/releases/' + id, options, cb);
         }
      }, {
         key: 'listReleases',
         value: function listReleases(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/releases', null, cb);
         }
      }, {
         key: 'getRelease',
         value: function getRelease(id, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
         }
      }, {
         key: 'deleteRelease',
         value: function deleteRelease(id, cb) {
            return this._request('DELETE', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
         }
      }, {
         key: 'mergePullRequest',
         value: function mergePullRequest(number, options, cb) {
            return this._request('PUT', '/repos/' + this.__fullname + '/pulls/' + number + '/merge', options, cb);
         }
      }]);

      return Repository;
   }(_Requestable3.default);

   module.exports = Repository;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcG9zaXRvcnkuanMiXSwibmFtZXMiOlsibG9nIiwiUmVwb3NpdG9yeSIsImZ1bGxuYW1lIiwiYXV0aCIsImFwaUJhc2UiLCJfX2Z1bGxuYW1lIiwiX19jdXJyZW50VHJlZSIsImJyYW5jaCIsInNoYSIsInJlZiIsImNiIiwiX3JlcXVlc3QiLCJvcHRpb25zIiwibnVtYmVyIiwiYmFzZSIsImhlYWQiLCJzaW5jZSIsIl9kYXRlVG9JU08iLCJ1bnRpbCIsInBhdGgiLCJ0cmVlU0hBIiwiY29udGVudCIsInBvc3RCb2R5IiwiX2dldENvbnRlbnRPYmplY3QiLCJlbmNvZGUiLCJlbmNvZGluZyIsIkJ1ZmZlciIsInRvU3RyaW5nIiwiQmxvYiIsIkpTT04iLCJzdHJpbmdpZnkiLCJFcnJvciIsImJhc2VUcmVlU0hBIiwiYmxvYlNIQSIsIm5ld1RyZWUiLCJiYXNlX3RyZWUiLCJ0cmVlIiwibW9kZSIsInR5cGUiLCJiYXNlU0hBIiwicGFyZW50IiwibWVzc2FnZSIsImRhdGEiLCJwYXJlbnRzIiwidGhlbiIsInJlc3BvbnNlIiwiY29tbWl0U0hBIiwiZm9yY2UiLCJ1c2VybmFtZSIsInJhdyIsImVuY29kZVVSSSIsIm9sZEJyYW5jaCIsIm5ld0JyYW5jaCIsImdldFJlZiIsIm9iamVjdCIsImNyZWF0ZVJlZiIsInVwZGF0ZVB1bGxSZXF1ZXN0IiwiaWQiLCJnZXRTaGEiLCJkZWxldGVDb21taXQiLCJvbGRQYXRoIiwibmV3UGF0aCIsIm9sZFNoYSIsImdldFRyZWUiLCJtYXAiLCJjcmVhdGVUcmVlIiwiY29tbWl0IiwidXBkYXRlSGVhZCIsImZpbGVQYXRoIiwic2hvdWxkRW5jb2RlIiwiYXV0aG9yIiwiY29tbWl0dGVyIiwiX3JlcXVlc3QyMDRvcjQwNCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztB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Q0FRWUEsRSxFQUFJO0FBQ2QsbUJBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBS04sVUFBcEMsZ0JBQTJELElBQTNELEVBQWlFSyxFQUFqRSxDQUFQO0FBQ0Y7OztvQ0FTVStDLEUsRUFBSS9DLEUsRUFBSTtBQUNoQixtQkFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLTixVQUFwQyxrQkFBMkRvRCxFQUEzRCxFQUFpRSxJQUFqRSxFQUF1RS9DLEVBQXZFLENBQVA7QUFDRjs7O3VDQVNhK0MsRSxFQUFJL0MsRSxFQUFJO0FBQ25CLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtOLFVBQXZDLGtCQUE4RG9ELEVBQTlELEVBQW9FLElBQXBFLEVBQTBFL0MsRUFBMUUsQ0FBUDtBQUNGOzs7MENBVWdCRyxNLEVBQVFELE8sRUFBU0YsRSxFQUFJO0FBQ25DLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtOLFVBQXBDLGVBQXdEUSxNQUF4RCxhQUF3RUQsT0FBeEUsRUFBaUZGLEVBQWpGLENBQVA7QUFDRjs7Ozs7O0FBR0orRCxVQUFPQyxPQUFQLEdBQWlCekUsVUFBakIiLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXHJcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXHJcbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cclxuICovXHJcblxyXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XHJcbmltcG9ydCBVdGY4IGZyb20gJ3V0ZjgnO1xyXG5pbXBvcnQge1xyXG4gICBCYXNlNjRcclxufSBmcm9tICdqcy1iYXNlNjQnO1xyXG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xyXG5jb25zdCBsb2cgPSBkZWJ1ZygnZ2l0aHViOnJlcG9zaXRvcnknKTtcclxuXHJcbi8qKlxyXG4gKiBSZXNwb3NpdG9yeSBlbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gY3JlYXRlLCBxdWVyeSwgYW5kIG1vZGlmeSBmaWxlcy5cclxuICovXHJcbmNsYXNzIFJlcG9zaXRvcnkgZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBSZXBvc2l0b3J5LlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gZnVsbG5hbWUgLSB0aGUgZnVsbCBuYW1lIG9mIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxyXG4gICAgKi9cclxuICAgY29uc3RydWN0b3IoZnVsbG5hbWUsIGF1dGgsIGFwaUJhc2UpIHtcclxuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XHJcbiAgICAgIHRoaXMuX19mdWxsbmFtZSA9IGZ1bGxuYW1lO1xyXG4gICAgICB0aGlzLl9fY3VycmVudFRyZWUgPSB7XHJcbiAgICAgICAgIGJyYW5jaDogbnVsbCxcclxuICAgICAgICAgc2hhOiBudWxsXHJcbiAgICAgIH07XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgYSByZWZlcmVuY2VcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyNnZXQtYS1yZWZlcmVuY2VcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWZlcmVuY2UgdG8gZ2V0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlZmVyZW5jZSdzIHJlZlNwZWMgb3IgYSBsaXN0IG9mIHJlZlNwZWNzIHRoYXQgbWF0Y2ggYHJlZmBcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0UmVmKHJlZiwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzLyR7cmVmfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIHJlZmVyZW5jZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3JlZnMvI2NyZWF0ZS1hLXJlZmVyZW5jZVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBvYmplY3QgZGVzY3JpYmluZyB0aGUgcmVmXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlZlxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVSZWYob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvcmVmc2AsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIERlbGV0ZSBhIHJlZmVyZW5jZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3JlZnMvI2RlbGV0ZS1hLXJlZmVyZW5jZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIC0gdGhlIG5hbWUgb2YgdGhlIHJlZiB0byBkZWx0ZVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBkZWxldGVSZWYocmVmLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3JlZnMvJHtyZWZ9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRGVsZXRlIGEgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2RlbGV0ZS1hLXJlcG9zaXRvcnlcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZGVsZXRlUmVwbyhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSB0YWdzIG9uIGEgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2xpc3QtdGFnc1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSB0YWcgZGF0YVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0VGFncyhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vdGFnc2AsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIG9wZW4gcHVsbCByZXF1ZXN0cyBvbiB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI2xpc3QtcHVsbC1yZXF1ZXN0c1xyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgdG8gZmlsdGVyIHRoZSBzZWFyY2hcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBQUnNcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdFB1bGxSZXF1ZXN0cyhvcHRpb25zLCBjYikge1xyXG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzYCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGEgc3BlY2lmaWMgcHVsbCByZXF1ZXN0XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jZ2V0LWEtc2luZ2xlLXB1bGwtcmVxdWVzdFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gdGhlIFBSIHlvdSB3aXNoIHRvIGZldGNoXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIFBSIGZyb20gdGhlIEFQSVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRQdWxsUmVxdWVzdChudW1iZXIsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9wdWxscy8ke251bWJlcn1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IHRoZSBmaWxlcyBvZiBhIHNwZWNpZmljIHB1bGwgcmVxdWVzdFxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI2xpc3QtcHVsbC1yZXF1ZXN0cy1maWxlc1xyXG4gICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG51bWJlciAtIHRoZSBQUiB5b3Ugd2lzaCB0byBmZXRjaFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGZpbGVzIGZyb20gdGhlIEFQSVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0UHVsbFJlcXVlc3RGaWxlcyhudW1iZXIsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9wdWxscy8ke251bWJlcn0vZmlsZXNgLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDb21wYXJlIHR3byBicmFuY2hlcy9jb21taXRzL3JlcG9zaXRvcmllc1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jY29tcGFyZS10d28tY29tbWl0c1xyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZSAtIHRoZSBiYXNlIGNvbW1pdFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZCAtIHRoZSBoZWFkIGNvbW1pdFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tcGFyaXNvblxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjb21wYXJlQnJhbmNoZXMoYmFzZSwgaGVhZCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbXBhcmUvJHtiYXNlfS4uLiR7aGVhZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBMaXN0IGFsbCB0aGUgYnJhbmNoZXMgZm9yIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1icmFuY2hlc1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBicmFuY2hlc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0QnJhbmNoZXMoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2JyYW5jaGVzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IGEgcmF3IGJsb2IgZnJvbSB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L2Jsb2JzLyNnZXQtYS1ibG9iXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGEgLSB0aGUgc2hhIG9mIHRoZSBibG9iIHRvIGZldGNoXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBibG9iIGZyb20gdGhlIEFQSVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRCbG9iKHNoYSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9ibG9icy8ke3NoYX1gLCBudWxsLCBjYiwgJ3JhdycpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IGEgc2luZ2xlIGJyYW5jaFxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvYnJhbmNoZXMvI2dldC1icmFuY2hcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJyYW5jaCAtIHRoZSBuYW1lIG9mIHRoZSBicmFuY2ggdG8gZmV0Y2hcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGJyYW5jaCBmcm9tIHRoZSBBUElcclxuICAgICogQHJldHVybnMge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldEJyYW5jaChicmFuY2gsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9icmFuY2hlcy8ke2JyYW5jaH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgYSBjb21taXQgZnJvbSB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jZ2V0LWEtc2luZ2xlLWNvbW1pdFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhIC0gdGhlIHNoYSBmb3IgdGhlIGNvbW1pdCB0byBmZXRjaFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IGRhdGFcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0Q29tbWl0KHNoYSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9jb21taXRzLyR7c2hhfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIGNvbW1pdHMgb24gYSByZXBvc2l0b3J5LCBvcHRpb25hbGx5IGZpbHRlcmluZyBieSBwYXRoLCBhdXRob3Igb3IgdGltZSByYW5nZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jbGlzdC1jb21taXRzLW9uLWEtcmVwb3NpdG9yeVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIGZpbHRlcmluZyBvcHRpb25zIGZvciBjb21taXRzXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5zaGFdIC0gdGhlIFNIQSBvciBicmFuY2ggdG8gc3RhcnQgZnJvbVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGF0aF0gLSB0aGUgcGF0aCB0byBzZWFyY2ggb25cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmF1dGhvcl0gLSB0aGUgY29tbWl0IGF1dGhvclxyXG4gICAgKiBAcGFyYW0geyhEYXRlfHN0cmluZyl9IFtvcHRpb25zLnNpbmNlXSAtIG9ubHkgY29tbWl0cyBhZnRlciB0aGlzIGRhdGUgd2lsbCBiZSByZXR1cm5lZFxyXG4gICAgKiBAcGFyYW0geyhEYXRlfHN0cmluZyl9IFtvcHRpb25zLnVudGlsXSAtIG9ubHkgY29tbWl0cyBiZWZvcmUgdGhpcyBkYXRlIHdpbGwgYmUgcmV0dXJuZWRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY29tbWl0cyBmb3VuZCBtYXRjaGluZyB0aGUgY3JpdGVyaWFcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgbGlzdENvbW1pdHMob3B0aW9ucywgY2IpIHtcclxuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgICBvcHRpb25zLnNpbmNlID0gdGhpcy5fZGF0ZVRvSVNPKG9wdGlvbnMuc2luY2UpO1xyXG4gICAgICBvcHRpb25zLnVudGlsID0gdGhpcy5fZGF0ZVRvSVNPKG9wdGlvbnMudW50aWwpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbW1pdHNgLCBvcHRpb25zLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBzaW5nbGUgY29tbWl0IGluZm9ybWF0aW9uIGZvciBhIHJlcG9zaXRvcnlcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb21taXRzLyNnZXQtYS1zaW5nbGUtY29tbWl0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIC0gdGhlIHJlZmVyZW5jZSBmb3IgdGhlIGNvbW1pdC1pc2hcclxuICAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgaW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICAqL1xyXG4gICBnZXRTaW5nbGVDb21taXQocmVmLCBjYikge1xyXG4gICAgICByZWYgPSByZWYgfHwgJyc7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21taXRzLyR7cmVmfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEdldCB0aGEgc2hhIGZvciBhIHBhcnRpY3VsYXIgb2JqZWN0IGluIHRoZSByZXBvc2l0b3J5LiBUaGlzIGlzIGEgY29udmVuaWVuY2UgZnVuY3Rpb25cclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyNnZXQtY29udGVudHNcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFticmFuY2hdIC0gdGhlIGJyYW5jaCB0byBsb29rIGluLCBvciB0aGUgcmVwb3NpdG9yeSdzIGRlZmF1bHQgYnJhbmNoIGlmIG9taXR0ZWRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBvZiB0aGUgZmlsZSBvciBkaXJlY3RvcnlcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgYSBkZXNjcmlwdGlvbiBvZiB0aGUgcmVxdWVzdGVkIG9iamVjdCwgaW5jbHVkaW5nIGEgYFNIQWAgcHJvcGVydHlcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0U2hhKGJyYW5jaCwgcGF0aCwgY2IpIHtcclxuICAgICAgYnJhbmNoID0gYnJhbmNoID8gYD9yZWY9JHticmFuY2h9YCA6ICcnO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtwYXRofSR7YnJhbmNofWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIExpc3QgdGhlIGNvbW1pdCBzdGF0dXNlcyBmb3IgYSBwYXJ0aWN1bGFyIHNoYSwgYnJhbmNoLCBvciB0YWdcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3N0YXR1c2VzLyNsaXN0LXN0YXR1c2VzLWZvci1hLXNwZWNpZmljLXJlZlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhIC0gdGhlIHNoYSwgYnJhbmNoLCBvciB0YWcgdG8gZ2V0IHN0YXR1c2VzIGZvclxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBzdGF0dXNlc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0U3RhdHVzZXMoc2hhLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29tbWl0cy8ke3NoYX0vc3RhdHVzZXNgLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgYSBkZXNjcmlwdGlvbiBvZiBhIGdpdCB0cmVlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvdHJlZXMvI2dldC1hLXRyZWVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHRyZWVTSEEgLSB0aGUgU0hBIG9mIHRoZSB0cmVlIHRvIGZldGNoXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjYWxsYmFjayBkYXRhXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldFRyZWUodHJlZVNIQSwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC90cmVlcy8ke3RyZWVTSEF9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgYmxvYlxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L2Jsb2JzLyNjcmVhdGUtYS1ibG9iXHJcbiAgICAqIEBwYXJhbSB7KHN0cmluZ3xCdWZmZXJ8QmxvYil9IGNvbnRlbnQgLSB0aGUgY29udGVudCB0byBhZGQgdG8gdGhlIHJlcG9zaXRvcnlcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGRldGFpbHMgb2YgdGhlIGNyZWF0ZWQgYmxvYlxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVCbG9iKGNvbnRlbnQsIGNiKSB7XHJcbiAgICAgIGxldCBwb3N0Qm9keSA9IHRoaXMuX2dldENvbnRlbnRPYmplY3QoY29udGVudCk7XHJcblxyXG4gICAgICBsb2coJ3NlbmRpbmcgY29udGVudCcsIHBvc3RCb2R5KTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvYmxvYnNgLCBwb3N0Qm9keSwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IHRoZSBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBwcm92aWRlZCBjb250ZW50XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfEJ1ZmZlcnxCbG9ifSBjb250ZW50IC0gdGhlIGNvbnRlbnQgdG8gc2VuZCB0byB0aGUgc2VydmVyXHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIHJlcHJlc2VudGF0aW9uIG9mIGBjb250ZW50YCBmb3IgdGhlIEdpdEh1YiBBUElcclxuICAgICovXHJcbiAgIF9nZXRDb250ZW50T2JqZWN0KGNvbnRlbnQpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICBsb2coJ2NvbnRldCBpcyBhIHN0cmluZycpO1xyXG4gICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb250ZW50OiBVdGY4LmVuY29kZShjb250ZW50KSxcclxuICAgICAgICAgICAgZW5jb2Rpbmc6ICd1dGYtOCdcclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgY29udGVudCBpbnN0YW5jZW9mIEJ1ZmZlcikge1xyXG4gICAgICAgICBsb2coJ1dlIGFwcGVhciB0byBiZSBpbiBOb2RlJyk7XHJcbiAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQudG9TdHJpbmcoJ2Jhc2U2NCcpLFxyXG4gICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCdcclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGNvbnRlbnQgaW5zdGFuY2VvZiBCbG9iKSB7XHJcbiAgICAgICAgIGxvZygnV2UgYXBwZWFyIHRvIGJlIGluIHRoZSBicm93c2VyJyk7XHJcbiAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IEJhc2U2NC5lbmNvZGUoY29udGVudCksXHJcbiAgICAgICAgICAgIGVuY29kaW5nOiAnYmFzZTY0J1xyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgfSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICBsb2coYE5vdCBzdXJlIHdoYXQgdGhpcyBjb250ZW50IGlzOiAke3R5cGVvZiBjb250ZW50fSwgJHtKU09OLnN0cmluZ2lmeShjb250ZW50KX1gKTtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGNvbnRlbnQgcGFzc2VkIHRvIHBvc3RCbG9iLiBNdXN0IGJlIHN0cmluZyBvciBCdWZmZXIgKG5vZGUpIG9yIEJsb2IgKHdlYiknKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogVXBkYXRlIGEgdHJlZSBpbiBHaXRcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC90cmVlcy8jY3JlYXRlLWEtdHJlZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVRyZWVTSEEgLSB0aGUgU0hBIG9mIHRoZSB0cmVlIHRvIHVwZGF0ZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIGZvciB0aGUgbmV3IGZpbGVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJsb2JTSEEgLSB0aGUgU0hBIGZvciB0aGUgYmxvYiB0byBwdXQgYXQgYHBhdGhgXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgdHJlZSB0aGF0IGlzIGNyZWF0ZWRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIFJlcG9zaXRvcnkjY3JlYXRlVHJlZX0gaW5zdGVhZFxyXG4gICAgKi9cclxuICAgdXBkYXRlVHJlZShiYXNlVHJlZVNIQSwgcGF0aCwgYmxvYlNIQSwgY2IpIHtcclxuICAgICAgbGV0IG5ld1RyZWUgPSB7XHJcbiAgICAgICAgIGJhc2VfdHJlZTogYmFzZVRyZWVTSEEsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgdHJlZTogW3tcclxuICAgICAgICAgICAgcGF0aDogcGF0aCxcclxuICAgICAgICAgICAgc2hhOiBibG9iU0hBLFxyXG4gICAgICAgICAgICBtb2RlOiAnMTAwNjQ0JyxcclxuICAgICAgICAgICAgdHlwZTogJ2Jsb2InXHJcbiAgICAgICAgIH1dXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC90cmVlc2AsIG5ld1RyZWUsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyB0cmVlIGluIGdpdFxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3RyZWVzLyNjcmVhdGUtYS10cmVlXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSB0cmVlIC0gdGhlIHRyZWUgdG8gY3JlYXRlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlU0hBIC0gdGhlIHJvb3Qgc2hhIG9mIHRoZSB0cmVlXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgdHJlZSB0aGF0IGlzIGNyZWF0ZWRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlVHJlZSh0cmVlLCBiYXNlU0hBLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC90cmVlc2AsIHtcclxuICAgICAgICAgdHJlZSxcclxuICAgICAgICAgYmFzZV90cmVlOiBiYXNlU0hBIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgfSwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQWRkIGEgY29tbWl0IHRvIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvY29tbWl0cy8jY3JlYXRlLWEtY29tbWl0XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnQgLSB0aGUgU0hBIG9mIHRoZSBwYXJlbnQgY29tbWl0XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmVlIC0gdGhlIFNIQSBvZiB0aGUgdHJlZSBmb3IgdGhpcyBjb21taXRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgY29tbWl0IG1lc3NhZ2VcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCB0aGF0IGlzIGNyZWF0ZWRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY29tbWl0KHBhcmVudCwgdHJlZSwgbWVzc2FnZSwgY2IpIHtcclxuICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgIHRyZWUsXHJcbiAgICAgICAgIHBhcmVudHM6IFtwYXJlbnRdXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9jb21taXRzYCwgZGF0YSwgY2IpXHJcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9fY3VycmVudFRyZWUuc2hhID0gcmVzcG9uc2UuZGF0YS5zaGE7IC8vIFVwZGF0ZSBsYXRlc3QgY29tbWl0XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBVcGRhdGUgYSByZWZcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyN1cGRhdGUtYS1yZWZlcmVuY2VcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWYgdG8gdXBkYXRlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21taXRTSEEgLSB0aGUgU0hBIHRvIHBvaW50IHRoZSByZWZlcmVuY2UgdG9cclxuICAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZSAtIGluZGljYXRlcyB3aGV0aGVyIHRvIGZvcmNlIG9yIGVuc3VyZSBhIGZhc3QtZm9yd2FyZCB1cGRhdGVcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgcmVmIGJhY2tcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgdXBkYXRlSGVhZChyZWYsIGNvbW1pdFNIQSwgZm9yY2UsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzLyR7cmVmfWAsIHtcclxuICAgICAgICAgc2hhOiBjb21taXRTSEEsXHJcbiAgICAgICAgIGZvcmNlOiBmb3JjZVxyXG4gICAgICB9LCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlcG9zaXRvcnlcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNnZXRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldERldGFpbHMoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgY29udHJpYnV0b3JzIHRvIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1jb250cmlidXRvcnNcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY29udHJpYnV0b3JzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldENvbnRyaWJ1dG9ycyhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vc3RhdHMvY29udHJpYnV0b3JzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgdXNlcnMgd2hvIGFyZSBjb2xsYWJvcmF0b3JzIG9uIHRoZSByZXBvc2l0b3J5LiBUaGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlciBtdXN0IGhhdmVcclxuICAgICogcHVzaCBhY2Nlc3MgdG8gdXNlIHRoaXMgbWV0aG9kXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb2xsYWJvcmF0b3JzLyNsaXN0LWNvbGxhYm9yYXRvcnNcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY29sbGFib3JhdG9yc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRDb2xsYWJvcmF0b3JzKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb2xsYWJvcmF0b3JzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIGEgY29sbGFib3JhdG9yIG9uIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb2xsYWJvcmF0b3JzLyNjaGVjay1pZi1hLXVzZXItaXMtYS1jb2xsYWJvcmF0b3JcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gdGhlIHVzZXIgdG8gY2hlY2tcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgdXNlciBpcyBhIGNvbGxhYm9yYXRvciBhbmQgZmFsc2UgaWYgdGhleSBhcmUgbm90XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3Qge0Jvb2xlYW59IFtkZXNjcmlwdGlvbl1cclxuICAgICovXHJcbiAgIGlzQ29sbGFib3JhdG9yKHVzZXJuYW1lLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29sbGFib3JhdG9ycy8ke3VzZXJuYW1lfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEdldCB0aGUgY29udGVudHMgb2YgYSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jZ2V0LWNvbnRlbnRzXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmIHRvIGNoZWNrXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggY29udGFpbmluZyB0aGUgY29udGVudCB0byBmZXRjaFxyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJhdyAtIGB0cnVlYCBpZiB0aGUgcmVzdWx0cyBzaG91bGQgYmUgcmV0dXJuZWQgcmF3IGluc3RlYWQgb2YgR2l0SHViJ3Mgbm9ybWFsaXplZCBmb3JtYXRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGZldGNoZWQgZGF0YVxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRDb250ZW50cyhyZWYsIHBhdGgsIHJhdywgY2IpIHtcclxuICAgICAgcGF0aCA9IHBhdGggPyBgJHtlbmNvZGVVUkkocGF0aCl9YCA6ICcnO1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtwYXRofWAsIHtcclxuICAgICAgICAgcmVmXHJcbiAgICAgIH0sIGNiLCByYXcpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IHRoZSBSRUFETUUgb2YgYSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jZ2V0LXRoZS1yZWFkbWVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWYgdG8gY2hlY2tcclxuICAgICogQHBhcmFtIHtib29sZWFufSByYXcgLSBgdHJ1ZWAgaWYgdGhlIHJlc3VsdHMgc2hvdWxkIGJlIHJldHVybmVkIHJhdyBpbnN0ZWFkIG9mIEdpdEh1YidzIG5vcm1hbGl6ZWQgZm9ybWF0XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBmZXRjaGVkIGRhdGFcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZ2V0UmVhZG1lKHJlZiwgcmF3LCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVhZG1lYCwge1xyXG4gICAgICAgICByZWZcclxuICAgICAgfSwgY2IsIHJhdyk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBGb3JrIGEgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvZm9ya3MvI2NyZWF0ZS1hLWZvcmtcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBuZXdseSBjcmVhdGVkIGZvcmtcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZm9yayhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2ZvcmtzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCBhIHJlcG9zaXRvcnkncyBmb3Jrc1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvZm9ya3MvI2xpc3QtZm9ya3NcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzIGZvcmtlZCBmcm9tIHRoaXMgb25lXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RGb3JrcyhjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZm9ya3NgLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBuZXcgYnJhbmNoIGZyb20gYW4gZXhpc3RpbmcgYnJhbmNoLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29sZEJyYW5jaD1tYXN0ZXJdIC0gdGhlIG5hbWUgb2YgdGhlIGV4aXN0aW5nIGJyYW5jaFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3QnJhbmNoIC0gdGhlIG5hbWUgb2YgdGhlIG5ldyBicmFuY2hcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCBkYXRhIGZvciB0aGUgaGVhZCBvZiB0aGUgbmV3IGJyYW5jaFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBjcmVhdGVCcmFuY2gob2xkQnJhbmNoLCBuZXdCcmFuY2gsIGNiKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbmV3QnJhbmNoID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgIGNiID0gbmV3QnJhbmNoO1xyXG4gICAgICAgICBuZXdCcmFuY2ggPSBvbGRCcmFuY2g7XHJcbiAgICAgICAgIG9sZEJyYW5jaCA9ICdtYXN0ZXInO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5nZXRSZWYoYGhlYWRzLyR7b2xkQnJhbmNofWApXHJcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2hhID0gcmVzcG9uc2UuZGF0YS5vYmplY3Quc2hhO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZWYoe1xyXG4gICAgICAgICAgICAgICBzaGEsXHJcbiAgICAgICAgICAgICAgIHJlZjogYHJlZnMvaGVhZHMvJHtuZXdCcmFuY2h9YFxyXG4gICAgICAgICAgICB9LCBjYik7XHJcbiAgICAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ3JlYXRlIGEgbmV3IHB1bGwgcmVxdWVzdFxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI2NyZWF0ZS1hLXB1bGwtcmVxdWVzdFxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBwdWxsIHJlcXVlc3QgZGVzY3JpcHRpb25cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyBwdWxsIHJlcXVlc3RcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlUHVsbFJlcXVlc3Qob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9wdWxsc2AsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFVwZGF0ZSBhIHB1bGwgcmVxdWVzdFxyXG4gICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDIuNC4wXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jdXBkYXRlLWEtcHVsbC1yZXF1ZXN0XHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbnVtYmVyIC0gdGhlIG51bWJlciBvZiB0aGUgcHVsbCByZXF1ZXN0IHRvIHVwZGF0ZVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBwdWxsIHJlcXVlc3QgZGVzY3JpcHRpb25cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcHVsbCByZXF1ZXN0IGluZm9ybWF0aW9uXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIHVwZGF0ZVB1bGxSZXF1c3QobnVtYmVyLCBvcHRpb25zLCBjYikge1xyXG4gICAgICBsb2coJ0RlcHJlY2F0ZWQ6IFRoaXMgbWV0aG9kIGNvbnRhaW5zIGEgdHlwbyBhbmQgaXQgaGFzIGJlZW4gZGVwcmVjYXRlZC4gSXQgd2lsbCBiZSByZW1vdmVkIGluIG5leHQgbWFqb3IgdmVyc2lvbi4gVXNlIHVwZGF0ZVB1bGxSZXF1ZXN0KCkgaW5zdGVhZC4nKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVB1bGxSZXF1ZXN0KG51bWJlciwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogVXBkYXRlIGEgcHVsbCByZXF1ZXN0XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jdXBkYXRlLWEtcHVsbC1yZXF1ZXN0XHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbnVtYmVyIC0gdGhlIG51bWJlciBvZiB0aGUgcHVsbCByZXF1ZXN0IHRvIHVwZGF0ZVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBwdWxsIHJlcXVlc3QgZGVzY3JpcHRpb25cclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcHVsbCByZXF1ZXN0IGluZm9ybWF0aW9uXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIHVwZGF0ZVB1bGxSZXF1ZXN0KG51bWJlciwgb3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHMvJHtudW1iZXJ9YCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgaG9va3MgZm9yIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jbGlzdC1ob29rc1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBob29rc1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0SG9va3MoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IGEgaG9vayBmb3IgdGhlIHJlcG9zaXRvcnlcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2hvb2tzLyNnZXQtc2luZ2xlLWhvb2tcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSB3ZWJvb2tcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGRldGFpbHMgb2YgdGhlIHdlYm9va1xyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRIb29rKGlkLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vaG9va3MvJHtpZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBBZGQgYSBuZXcgaG9vayB0byB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvaG9va3MvI2NyZWF0ZS1hLWhvb2tcclxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgY29uZmlndXJhdGlvbiBkZXNjcmliaW5nIHRoZSBuZXcgaG9va1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IHdlYmhvb2tcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlSG9vayhvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzYCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRWRpdCBhbiBleGlzdGluZyB3ZWJob29rXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jZWRpdC1hLWhvb2tcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSB3ZWJob29rXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIG5ldyBkZXNjcmlwdGlvbiBvZiB0aGUgd2ViaG9va1xyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgdXBkYXRlZCB3ZWJob29rXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIHVwZGF0ZUhvb2soaWQsIG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzLyR7aWR9YCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogRGVsZXRlIGEgd2ViaG9va1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvaG9va3MvI2RlbGV0ZS1hLWhvb2tcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSB3ZWJob29rIHRvIGJlIGRlbGV0ZWRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgY2FsbCBpcyBzdWNjZXNzZnVsXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGRlbGV0ZUhvb2soaWQsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzLyR7aWR9YCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogTGlzdCB0aGUgZGVwbG95IGtleXMgZm9yIHRoZSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9rZXlzLyNsaXN0LWRlcGxveS1rZXlzXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGRlcGxveSBrZXlzXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGxpc3RLZXlzKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9rZXlzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IGEgZGVwbG95IGtleSBmb3IgdGhlIHJlcG9zaXRvcnlcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2tleXMvI2dldC1hLWRlcGxveS1rZXlcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSBkZXBsb3kga2V5XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBkZXRhaWxzIG9mIHRoZSBkZXBsb3kga2V5XHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGdldEtleShpZCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2tleXMvJHtpZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBBZGQgYSBuZXcgZGVwbG95IGtleSB0byB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mva2V5cy8jYWRkLWEtbmV3LWRlcGxveS1rZXlcclxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgY29uZmlndXJhdGlvbiBkZXNjcmliaW5nIHRoZSBuZXcgZGVwbG95IGtleVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IGRlcGxveSBrZXlcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgY3JlYXRlS2V5KG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0va2V5c2AsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIERlbGV0ZSBhIGRlcGxveSBrZXlcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2tleXMvI3JlbW92ZS1hLWRlcGxveS1rZXlcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSBkZXBsb3kga2V5IHRvIGJlIGRlbGV0ZWRcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgY2FsbCBpcyBzdWNjZXNzZnVsXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGRlbGV0ZUtleShpZCwgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2tleXMvJHtpZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBEZWxldGUgYSBmaWxlIGZyb20gYSBicmFuY2hcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyNkZWxldGUtYS1maWxlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2ggLSB0aGUgYnJhbmNoIHRvIGRlbGV0ZSBmcm9tLCBvciB0aGUgZGVmYXVsdCBicmFuY2ggaWYgbm90IHNwZWNpZmllZFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIHJlbW92ZVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IGluIHdoaWNoIHRoZSBkZWxldGUgb2NjdXJyZWRcclxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgZGVsZXRlRmlsZShicmFuY2gsIHBhdGgsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFNoYShicmFuY2gsIHBhdGgpXHJcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVDb21taXQgPSB7XHJcbiAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBEZWxldGUgdGhlIGZpbGUgYXQgJyR7cGF0aH0nYCxcclxuICAgICAgICAgICAgICAgc2hhOiByZXNwb25zZS5kYXRhLnNoYSxcclxuICAgICAgICAgICAgICAgYnJhbmNoXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke3BhdGh9YCwgZGVsZXRlQ29tbWl0LCBjYik7XHJcbiAgICAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ2hhbmdlIGFsbCByZWZlcmVuY2VzIGluIGEgcmVwbyBmcm9tIG9sZFBhdGggdG8gbmV3X3BhdGhcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJyYW5jaCAtIHRoZSBicmFuY2ggdG8gY2Fycnkgb3V0IHRoZSByZWZlcmVuY2UgY2hhbmdlLCBvciB0aGUgZGVmYXVsdCBicmFuY2ggaWYgbm90IHNwZWNpZmllZFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkUGF0aCAtIG9yaWdpbmFsIHBhdGhcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1BhdGggLSBuZXcgcmVmZXJlbmNlIHBhdGhcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCBpbiB3aGljaCB0aGUgbW92ZSBvY2N1cnJlZFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBtb3ZlKGJyYW5jaCwgb2xkUGF0aCwgbmV3UGF0aCwgY2IpIHtcclxuICAgICAgbGV0IG9sZFNoYTtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVmKGBoZWFkcy8ke2JyYW5jaH1gKVxyXG4gICAgICAgICAudGhlbigoe2RhdGE6IHtvYmplY3R9fSkgPT4gdGhpcy5nZXRUcmVlKGAke29iamVjdC5zaGF9P3JlY3Vyc2l2ZT10cnVlYCkpXHJcbiAgICAgICAgIC50aGVuKCh7ZGF0YToge3RyZWUsIHNoYX19KSA9PiB7XHJcbiAgICAgICAgICAgIG9sZFNoYSA9IHNoYTtcclxuICAgICAgICAgICAgbGV0IG5ld1RyZWUgPSB0cmVlLm1hcCgocmVmKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGlmIChyZWYucGF0aCA9PT0gb2xkUGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICByZWYucGF0aCA9IG5ld1BhdGg7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgaWYgKHJlZi50eXBlID09PSAndHJlZScpIHtcclxuICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlZi5zaGE7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgcmV0dXJuIHJlZjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRyZWUobmV3VHJlZSk7XHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgIC50aGVuKCh7ZGF0YTogdHJlZX0pID0+IHRoaXMuY29tbWl0KG9sZFNoYSwgdHJlZS5zaGEsIGBSZW5hbWVkICcke29sZFBhdGh9JyB0byAnJHtuZXdQYXRofSdgKSlcclxuICAgICAgICAgLnRoZW4oKHtkYXRhOiBjb21taXR9KSA9PiB0aGlzLnVwZGF0ZUhlYWQoYGhlYWRzLyR7YnJhbmNofWAsIGNvbW1pdC5zaGEsIHRydWUsIGNiKSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBXcml0ZSBhIGZpbGUgdG8gdGhlIHJlcG9zaXRvcnlcclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyN1cGRhdGUtYS1maWxlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2ggLSB0aGUgbmFtZSBvZiB0aGUgYnJhbmNoXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggZm9yIHRoZSBmaWxlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gdGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIGNvbW1pdCBtZXNzYWdlXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBjb21taXQgb3B0aW9uc1xyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuYXV0aG9yXSAtIHRoZSBhdXRob3Igb2YgdGhlIGNvbW1pdFxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuY29tbWl0ZXJdIC0gdGhlIGNvbW1pdHRlclxyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmVuY29kZV0gLSB0cnVlIGlmIHRoZSBjb250ZW50IHNob3VsZCBiZSBiYXNlNjQgZW5jb2RlZFxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IGNvbW1pdFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICB3cml0ZUZpbGUoYnJhbmNoLCBwYXRoLCBjb250ZW50LCBtZXNzYWdlLCBvcHRpb25zLCBjYikge1xyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgY2IgPSBvcHRpb25zO1xyXG4gICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgIH1cclxuICAgICAgbGV0IGZpbGVQYXRoID0gcGF0aCA/IGVuY29kZVVSSShwYXRoKSA6ICcnO1xyXG4gICAgICBsZXQgc2hvdWxkRW5jb2RlID0gb3B0aW9ucy5lbmNvZGUgIT09IGZhbHNlO1xyXG4gICAgICBsZXQgY29tbWl0ID0ge1xyXG4gICAgICAgICBicmFuY2gsXHJcbiAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgIGF1dGhvcjogb3B0aW9ucy5hdXRob3IsXHJcbiAgICAgICAgIGNvbW1pdHRlcjogb3B0aW9ucy5jb21taXR0ZXIsXHJcbiAgICAgICAgIGNvbnRlbnQ6IHNob3VsZEVuY29kZSA/IEJhc2U2NC5lbmNvZGUoY29udGVudCkgOiBjb250ZW50XHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5nZXRTaGEoYnJhbmNoLCBmaWxlUGF0aClcclxuICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbW1pdC5zaGEgPSByZXNwb25zZS5kYXRhLnNoYTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbnRlbnRzLyR7ZmlsZVBhdGh9YCwgY29tbWl0LCBjYik7XHJcbiAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbnRlbnRzLyR7ZmlsZVBhdGh9YCwgY29tbWl0LCBjYik7XHJcbiAgICAgICAgIH0pO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogQ2hlY2sgaWYgYSByZXBvc2l0b3J5IGlzIHN0YXJyZWQgYnkgeW91XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9hY3Rpdml0eS9zdGFycmluZy8jY2hlY2staWYteW91LWFyZS1zdGFycmluZy1hLXJlcG9zaXRvcnlcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVwb3NpdG9yeSBpcyBzdGFycmVkIGFuZCBmYWxzZSBpZiB0aGUgcmVwb3NpdG9yeVxyXG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBub3Qgc3RhcnJlZFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0IHtCb29sZWFufSBbZGVzY3JpcHRpb25dXHJcbiAgICAqL1xyXG4gICBpc1N0YXJyZWQoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL3VzZXIvc3RhcnJlZC8ke3RoaXMuX19mdWxsbmFtZX1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTdGFyIGEgcmVwb3NpdG9yeVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI3N0YXItYS1yZXBvc2l0b3J5XHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcG9zaXRvcnkgaXMgc3RhcnJlZFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBzdGFyKGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQVVQnLCBgL3VzZXIvc3RhcnJlZC8ke3RoaXMuX19mdWxsbmFtZX1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBVbnN0YXIgYSByZXBvc2l0b3J5XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9hY3Rpdml0eS9zdGFycmluZy8jdW5zdGFyLWEtcmVwb3NpdG9yeVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXBvc2l0b3J5IGlzIHVuc3RhcnJlZFxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICB1bnN0YXIoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvdXNlci9zdGFycmVkLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIG5ldyByZWxlYXNlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9yZWxlYXNlcy8jY3JlYXRlLWEtcmVsZWFzZVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgcmVsZWFzZVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3bHkgY3JlYXRlZCByZWxlYXNlXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGNyZWF0ZVJlbGVhc2Uob3B0aW9ucywgY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9yZWxlYXNlc2AsIG9wdGlvbnMsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIEVkaXQgYSByZWxlYXNlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9yZWxlYXNlcy8jZWRpdC1hLXJlbGVhc2VcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGlkIG9mIHRoZSByZWxlYXNlXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSByZWxlYXNlXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBtb2RpZmllZCByZWxlYXNlXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIHVwZGF0ZVJlbGVhc2UoaWQsIG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzLyR7aWR9YCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGFsbCByZWxlYXNlc1xyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2xpc3QtcmVsZWFzZXMtZm9yLWEtcmVwb3NpdG9yeVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVsZWFzZSBpbmZvcm1hdGlvblxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBsaXN0UmVsZWFzZXMoY2IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzYCwgbnVsbCwgY2IpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGEgcmVsZWFzZVxyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2dldC1hLXNpbmdsZS1yZWxlYXNlXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgcmVsZWFzZVxyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVsZWFzZSBpbmZvcm1hdGlvblxyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XHJcbiAgICAqL1xyXG4gICBnZXRSZWxlYXNlKGlkLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVsZWFzZXMvJHtpZH1gLCBudWxsLCBjYik7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBEZWxldGUgYSByZWxlYXNlXHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9yZWxlYXNlcy8jZGVsZXRlLWEtcmVsZWFzZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgcmVsZWFzZSB0byBiZSBkZWxldGVkXHJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIGRlbGV0ZVJlbGVhc2UoaWQsIGNiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9yZWxlYXNlcy8ke2lkfWAsIG51bGwsIGNiKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIE1lcmdlIGEgcHVsbCByZXF1ZXN0XHJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jbWVyZ2UtYS1wdWxsLXJlcXVlc3QtbWVyZ2UtYnV0dG9uXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbnVtYmVyIC0gdGhlIG51bWJlciBvZiB0aGUgcHVsbCByZXF1ZXN0IHRvIG1lcmdlXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIG1lcmdlIG9wdGlvbnMgZm9yIHRoZSBwdWxsIHJlcXVlc3RcclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWVyZ2UgaW5mb3JtYXRpb24gaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXHJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcclxuICAgICovXHJcbiAgIG1lcmdlUHVsbFJlcXVlc3QobnVtYmVyLCBvcHRpb25zLCBjYikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHMvJHtudW1iZXJ9L21lcmdlYCwgb3B0aW9ucywgY2IpO1xyXG4gICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVwb3NpdG9yeTtcclxuIl19
//# sourceMappingURL=Repository.js.map
