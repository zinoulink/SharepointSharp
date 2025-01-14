"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = stopWorkflow;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _getWorkflowID = _interopRequireDefault(require("./getWorkflowID.js"));

var _ajax = _interopRequireDefault(require("../utils/ajax.js"));

/**
 * @name $SP().list.stopWorkflow
 * @function
 * @description Stop/Terminate a Workflow 2010 instance (this is only for Workflow 2010)
 *
 * @param {Object} setup
 *   @param {Number} setup.ID The item ID that is tied to the workflow
 *   @param {String} setup.workflowName The name of the workflow
 * @return {Promise} resolve(), reject(error)
 *
 * @example
 * $SP().list("List Name").stopWorkflow({ID:42, workflowName:"My workflow"});
 */
function stopWorkflow(setup) {
  var _this = this;

  if (!this.url) throw "[SharepointSharp 'stopWorkflow'] not able to find the URL!";
  setup = setup || {};
  if (!setup.workflowName && !setup.workflowID) throw "[SharepointSharp 'stopWorkflow'] Please provide the workflow name";
  if (!setup.ID) throw "[SharepointSharp 'stopWorkflow'] Please provide the item ID"; // retrieve the workflow instances

  return _getWorkflowID.default.call(this, {
    ID: setup.ID,
    workflowName: setup.workflowName
  }).then(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(wrkflw) {
      var _context;

      var lenInstances, lastInstance, html, requestDigest, viewState, viewStateGenerator, eventValidation, params;
      return _regenerator.default.wrap(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              lenInstances = wrkflw.instances.length;

              if (!(lenInstances === 0)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", _promise.default.reject("[SharepointSharp 'stopWorkflow'] No instances found for this workflow"));

            case 3:
              lastInstance = wrkflw.instances[lenInstances - 1];
              _context3.next = 6;
              return _ajax.default.call(_this, {
                url: lastInstance.StatusPageUrl
              });

            case 6:
              html = _context3.sent;
              requestDigest = html.match(/<input type="hidden" name="__REQUESTDIGEST" id="__REQUESTDIGEST" value=".*" \/>/g);

              if (requestDigest) {
                _context3.next = 10;
                break;
              }

              throw "[SharepointSharp 'stopWorkflow'] Unable to find the __REQUESTDIGEST from the Workflow Status page";

            case 10:
              requestDigest = requestDigest[0].match(/<input type="hidden" name="__REQUESTDIGEST" id="__REQUESTDIGEST" value="(.*)" \/>/)[1];
              viewState = html.match(/<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value=".*" \/>/g);

              if (viewState) {
                _context3.next = 14;
                break;
              }

              throw "[SharepointSharp 'stopWorkflow'] Unable to find the __VIEWSTATE from the Workflow Status page";

            case 14:
              viewState = viewState[0].match(/<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="(.*)" \/>/)[1];
              viewStateGenerator = html.match(/<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value=".*" \/>/g);

              if (viewStateGenerator) {
                _context3.next = 18;
                break;
              }

              throw "[SharepointSharp 'stopWorkflow'] Unable to find the __VIEWSTATEGENERATOR from the Workflow Status page";

            case 18:
              viewStateGenerator = viewStateGenerator[0].match(/<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="(.*)" \/>/)[1];
              eventValidation = html.match(/<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value=".*" \/>/g);

              if (eventValidation) {
                _context3.next = 22;
                break;
              }

              throw "[SharepointSharp 'stopWorkflow'] Unable to find the __EVENTVALIDATION from the Workflow Status page";

            case 22:
              eventValidation = eventValidation[0].match(/<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="(.*)" \/>/)[1];
              params = {};
              params.MSOWebPartPage_PostbackSource = '';
              params.MSOTlPn_SelectedWpId = '';
              params.MSOTlPn_View = 0;
              params.MSOTlPn_ShowSettings = "False";
              params.MSOGallery_SelectedLibrary = '';
              params.MSOGallery_FilterString = '';
              params.MSOTlPn_Button = "none";
              params.__EVENTTARGET = "ctl00$PlaceHolderMain$HtmlAnchorEnd";
              params.__EVENTARGUMENT = "";
              params.MSOSPWebPartManager_DisplayModeName = "Browse";
              params.MSOSPWebPartManager_ExitingDesignMode = 'false';
              params.MSOWebPartPage_Shared = '';
              params.MSOLayout_LayoutChanges = '';
              params.MSOLayout_InDesignMode = '';
              params.MSOSPWebPartManager_OldDisplayModeName = 'Browse';
              params.MSOSPWebPartManager_StartWebPartEditingName = 'false';
              params.MSOSPWebPartManager_EndWebPartEditing = 'false';
              params._maintainWorkspaceScrollPosition = 0;
              params.__REQUESTDIGEST = requestDigest;
              params.__VIEWSTATE = viewState;
              params.__VIEWSTATEGENERATOR = viewStateGenerator;
              params.__SCROLLPOSITIONX = 0;
              params.__SCROLLPOSITIONY = 0;
              params.__EVENTVALIDATION = eventValidation;
              params["ctl00$PlaceHolderMain$WorkflowInstanceID"] = lastInstance.Id;
              params["ctl00$PlaceHolderMain$WorkflowInstanceName"] = '';
              params["ctl00$PlaceHolderMain$CachedTaskQueryString"] = '';
              params["ctl00$PlaceHolderMain$CachedHistoryQueryString"] = ''; // call the page to stop the workflow

              _context3.next = 54;
              return _ajax.default.call(_this, {
                url: lastInstance.StatusPageUrl,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: (0, _map.default)(_context = (0, _keys.default)(params)).call(_context, function (key) {
                  var _context2;

                  return (0, _concat.default)(_context2 = "".concat(encodeURIComponent(key), "=")).call(_context2, encodeURIComponent(params[key]));
                }).join('&')
              });

            case 54:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = exports.default;