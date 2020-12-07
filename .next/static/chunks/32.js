(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[32],{

/***/ "./node_modules/@pooltogether/bnc-onboard/dist/esm/connect-42f86a38.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@pooltogether/bnc-onboard/dist/esm/connect-42f86a38.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/@pooltogether/bnc-onboard/node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _onboard_197ee608_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onboard-197ee608.js */ \"./node_modules/@pooltogether/bnc-onboard/dist/esm/onboard-197ee608.js\");\n/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bignumber.js */ \"./node_modules/bignumber.js/bignumber.js\");\n/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var bnc_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bnc-sdk */ \"./node_modules/bnc-sdk/dist/esm/index.js\");\n/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bowser */ \"./node_modules/bowser/es5.js\");\n/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_4__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n\n\nfunction connect() {\n  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var heading = options.heading,\n      description = options.description,\n      icon = options.icon,\n      html = options.html,\n      button = options.button;\n  return /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(stateAndHelpers) {\n      var wallet, address, stateSyncStatus, stateStore;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              wallet = stateAndHelpers.wallet, address = stateAndHelpers.address, stateSyncStatus = stateAndHelpers.stateSyncStatus, stateStore = stateAndHelpers.stateStore;\n\n              if (!(address === null)) {\n                _context.next = 5;\n                break;\n              }\n\n              if (!stateSyncStatus.address) {\n                _context.next = 5;\n                break;\n              }\n\n              _context.next = 5;\n              return new Promise(function (resolve) {\n                stateSyncStatus.address && stateSyncStatus.address.then(resolve);\n                setTimeout(function () {\n                  if (address === null) {\n                    // if prom isn't resolving after 500ms, then stop waiting\n                    resolve();\n                  }\n                }, 500);\n              });\n\n            case 5:\n              if (!(!stateStore.address.get() && wallet && wallet.name)) {\n                _context.next = 7;\n                break;\n              }\n\n              return _context.abrupt(\"return\", {\n                heading: heading || 'Login and Authorize Your Wallet',\n                description: description || \"This dapp requires access to your wallet, please login and authorize access to your \".concat(wallet.name, \" accounts to continue.\"),\n                eventCode: 'loginFail',\n                action: wallet.connect,\n                icon: icon || _onboard_197ee608_js__WEBPACK_IMPORTED_MODULE_1__[\"c\"],\n                html: html,\n                button: button\n              });\n\n            case 7:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function (_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (connect);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0Bwb29sdG9nZXRoZXIvYm5jLW9uYm9hcmQvZGlzdC9lc20vY29ubmVjdC00MmY4NmEzOC5qcz9mYzM3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRFQUE0RSxNQUFNLDBCQUEwQix3QkFBd0IsRUFBRSxnQkFBZ0IsZUFBZSxRQUFRLEVBQUUsaUJBQWlCLGdCQUFnQixFQUFFLE9BQU8sNENBQTRDLEVBQUU7O0FBRXZRLGdDQUFnQyxxQkFBcUIsbUNBQW1DLGdEQUFnRCxnQ0FBZ0Msd0JBQXdCLHdFQUF3RSxFQUFFLHVCQUF1Qix1RUFBdUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEdBQUc7O0FBRTlWO0FBQ29CO0FBQ25DO0FBQ0w7QUFDRDs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsc0RBQVc7QUFDekM7QUFDQTtBQUNBLGVBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFZSxzRUFBTyIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AcG9vbHRvZ2V0aGVyL2JuYy1vbmJvYXJkL2Rpc3QvZXNtL2Nvbm5lY3QtNDJmODZhMzguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTsgfSB9XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBzZWxmID0gdGhpcywgYXJncyA9IGFyZ3VtZW50czsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpOyBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkgeyBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7IH0gZnVuY3Rpb24gX3Rocm93KGVycikgeyBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTsgfSBfbmV4dCh1bmRlZmluZWQpOyB9KTsgfTsgfVxuXG5pbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSc7XG5pbXBvcnQgeyBjIGFzIGNvbm5lY3RJY29uIH0gZnJvbSAnLi9vbmJvYXJkLTE5N2VlNjA4LmpzJztcbmltcG9ydCAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCAnYm5jLXNkayc7XG5pbXBvcnQgJ2Jvd3Nlcic7XG5cbmZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgdmFyIGhlYWRpbmcgPSBvcHRpb25zLmhlYWRpbmcsXG4gICAgICBkZXNjcmlwdGlvbiA9IG9wdGlvbnMuZGVzY3JpcHRpb24sXG4gICAgICBpY29uID0gb3B0aW9ucy5pY29uLFxuICAgICAgaHRtbCA9IG9wdGlvbnMuaHRtbCxcbiAgICAgIGJ1dHRvbiA9IG9wdGlvbnMuYnV0dG9uO1xuICByZXR1cm4gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgICB2YXIgX3JlZiA9IF9hc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShzdGF0ZUFuZEhlbHBlcnMpIHtcbiAgICAgIHZhciB3YWxsZXQsIGFkZHJlc3MsIHN0YXRlU3luY1N0YXR1cywgc3RhdGVTdG9yZTtcbiAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgd2FsbGV0ID0gc3RhdGVBbmRIZWxwZXJzLndhbGxldCwgYWRkcmVzcyA9IHN0YXRlQW5kSGVscGVycy5hZGRyZXNzLCBzdGF0ZVN5bmNTdGF0dXMgPSBzdGF0ZUFuZEhlbHBlcnMuc3RhdGVTeW5jU3RhdHVzLCBzdGF0ZVN0b3JlID0gc3RhdGVBbmRIZWxwZXJzLnN0YXRlU3RvcmU7XG5cbiAgICAgICAgICAgICAgaWYgKCEoYWRkcmVzcyA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghc3RhdGVTeW5jU3RhdHVzLmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1O1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZVN5bmNTdGF0dXMuYWRkcmVzcyAmJiBzdGF0ZVN5bmNTdGF0dXMuYWRkcmVzcy50aGVuKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGFkZHJlc3MgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgcHJvbSBpc24ndCByZXNvbHZpbmcgYWZ0ZXIgNTAwbXMsIHRoZW4gc3RvcCB3YWl0aW5nXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICBpZiAoISghc3RhdGVTdG9yZS5hZGRyZXNzLmdldCgpICYmIHdhbGxldCAmJiB3YWxsZXQubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgIGhlYWRpbmc6IGhlYWRpbmcgfHwgJ0xvZ2luIGFuZCBBdXRob3JpemUgWW91ciBXYWxsZXQnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB8fCBcIlRoaXMgZGFwcCByZXF1aXJlcyBhY2Nlc3MgdG8geW91ciB3YWxsZXQsIHBsZWFzZSBsb2dpbiBhbmQgYXV0aG9yaXplIGFjY2VzcyB0byB5b3VyIFwiLmNvbmNhdCh3YWxsZXQubmFtZSwgXCIgYWNjb3VudHMgdG8gY29udGludWUuXCIpLFxuICAgICAgICAgICAgICAgIGV2ZW50Q29kZTogJ2xvZ2luRmFpbCcsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB3YWxsZXQuY29ubmVjdCxcbiAgICAgICAgICAgICAgICBpY29uOiBpY29uIHx8IGNvbm5lY3RJY29uLFxuICAgICAgICAgICAgICAgIGh0bWw6IGh0bWwsXG4gICAgICAgICAgICAgICAgYnV0dG9uOiBidXR0b25cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIF9jYWxsZWUpO1xuICAgIH0pKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoX3gpIHtcbiAgICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0OyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@pooltogether/bnc-onboard/dist/esm/connect-42f86a38.js\n");

/***/ })

}]);